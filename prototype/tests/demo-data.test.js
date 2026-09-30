import test from 'node:test';
import assert from 'node:assert/strict';
import { createDemoDays, DEMO_DAYS, SERIES, SCENES, TIME_ZONE, formatLocalDate, formatLocalTime, localZoneLabel } from '../src/demo-data.js';
import { evaluateCommonSupport } from '../src/metrics.js';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);

test('fixture is deterministic and each call returns independent objects', () => {
  const first = createDemoDays();
  const second = createDemoDays();
  assert.deepEqual(first, second);
  assert.deepEqual(first, DEMO_DAYS);
  first[0].rows[0].mix.gas = -999;
  first[0].rows[0].forecasts.model.value = -999;
  assert.deepEqual(second, DEMO_DAYS);
});

test('seven winter days contain 168 contiguous UTC hourly targets with prior issuance', () => {
  const days = createDemoDays();
  assert.equal(days.length, 7);
  assert.equal(new Set(days.map(day => day.id)).size, 7);
  const rows = days.flatMap(day => day.rows);
  assert.equal(rows.length, 168);
  assert.equal(new Set(rows.map(row => row.target_time)).size, 168);
  assert.equal(rows[0].target_time, '2026-12-06T22:00:00.000Z');
  assert.equal(rows.at(-1).target_time, '2026-12-13T21:00:00.000Z');
  for (const [index, row] of rows.entries()) {
    assert.equal(Date.parse(row.target_time), Date.UTC(2026, 11, 6, 22) + index * 3600000);
    assert.equal(new Date(row.target_time).toISOString(), row.target_time);
    assert.equal(new Date(row.issued_at).toISOString(), row.issued_at);
    assert.ok(Date.parse(row.issued_at) < Date.parse(row.target_time));
    assert.ok(row.model_version.length > 0);
    assert.match(row.source, /DEMO/);
    for (const key of SERIES) {
      const forecast = row.forecasts[key];
      assert.equal(forecast.target_time, row.target_time);
      assert.equal(forecast.issued_at, row.issued_at);
      assert.ok(Date.parse(forecast.issued_at) < Date.parse(forecast.target_time));
      assert.ok(forecast.model_version.length > 0);
      assert.match(forecast.source, /DEMO/);
    }
  }
  for (const [index, day] of days.entries()) {
    assert.equal(day.rows.length, 24);
    assert.equal(day.date, `${String(7 + index).padStart(2, '0')}-12-2026`);
    assert.equal(formatLocalDate(day.rows[0].target_time), day.date);
    assert.ok(SCENES.includes(day.scene));
    for (const [hour, row] of day.rows.entries()) {
      assert.equal(formatLocalTime(row.target_time), `${String(hour).padStart(2, '0')}:00`);
      assert.equal(row.issued_at, day.issued_at);
    }
  }
  assert.deepEqual([...new Set(days.map(day => day.scene))].sort(), [...SCENES].sort());
});

test('flat series preserve exactly the two deliberate gaps, including the missing official', () => {
  const days = createDemoDays();
  const gaps = [];
  for (const [dayIndex, day] of days.entries()) {
    for (const [hour, row] of day.rows.entries()) {
      for (const key of ['actual', ...SERIES]) {
        if (!Number.isFinite(row[key])) gaps.push({ dayIndex, hour, key, value: row[key] });
      }
    }
  }
  assert.deepEqual(gaps, [
    { dayIndex: 2, hour: 11, key: 'official', value: null },
    { dayIndex: 3, hour: 4, key: 'actual', value: null },
  ]);
  assert.equal(days[2].rows[11].target_time, '2026-12-09T09:00:00.000Z');
  assert.equal(days[3].rows[4].target_time, '2026-12-10T02:00:00.000Z');
  // forecasts.official.value has a known metadata inconsistency, reported separately.
  // Do not require its repair or use it to fill the flat official gap in this task.
});

test('synthetic mix and net import balance are power quantities in MW', () => {
  for (const row of createDemoDays().flatMap(day => day.rows)) {
    assert.deepEqual(Object.keys(row.mix).sort(), ['coal', 'gas', 'hydro', 'nuclear', 'solar', 'wind']);
    for (const value of Object.values(row.mix)) {
      assert.ok(Number.isFinite(value));
      assert.ok(value >= 0);
    }
    assert.equal(Object.values(row.mix).reduce((sum, value) => sum + value, 0), row.generation);
    assert.equal(row.generation + row.netImport, row.consumption);
    assert.equal(row.consumption, row.model);
  }
  assert.equal(DEMO_DAYS[0].rows[0].mix.solar, 0);
});

test('Bucharest formatting uses winter UTC+2 and summer UTC+3, including date rollover', () => {
  assert.equal(TIME_ZONE, 'Europe/Bucharest');
  const winter = '2026-01-15T22:30:00.000Z';
  const summer = '2026-07-15T21:30:00.000Z';
  assert.equal(formatLocalDate(winter), '16-01-2026');
  assert.equal(formatLocalTime(winter), '00:30');
  assert.equal(formatLocalDate(summer), '16-07-2026');
  assert.equal(formatLocalTime(summer), '00:30');
  // ICU may emit EET/EEST or GMT+2/GMT+3; don't hardcode a platform spelling.
  assert.ok(localZoneLabel(winter).length > 0);
  assert.ok(localZoneLabel(summer).length > 0);
  assert.notEqual(localZoneLabel(winter), localZoneLabel(summer));
});

test('DST helpers skip spring hour and distinguish repeated autumn local hours', () => {
  assert.equal(formatLocalTime('2026-03-29T00:30:00.000Z'), '02:30');
  assert.equal(formatLocalTime('2026-03-29T01:30:00.000Z'), '04:30');
  const before = '2026-10-25T00:30:00.000Z';
  const after = '2026-10-25T01:30:00.000Z';
  assert.equal(Date.parse(after) - Date.parse(before), 3600000);
  assert.equal(formatLocalDate(before), '25-10-2026');
  assert.equal(formatLocalDate(after), '25-10-2026');
  assert.equal(formatLocalTime(before), '03:30');
  assert.equal(formatLocalTime(after), '03:30');
  assert.notEqual(localZoneLabel(before), localZoneLabel(after));
});

test('whole fixture evaluation excludes two intervals and matches an independent arithmetic oracle', () => {
  const rows = createDemoDays().flatMap(day => day.rows);
  const result = evaluateCommonSupport(rows);
  assert.equal(result.total, 168);
  assert.equal(result.n, 166);
  assert.equal(result.excluded, 2);
  close(result.coverage, 166 / 168);
  // Known gap indices determine support independently of evaluateCommonSupport's finite filter.
  const included = rows.filter((_, index) => index !== 2 * 24 + 11 && index !== 3 * 24 + 4);
  for (const key of SERIES) {
    let absolute = 0;
    let signed = 0;
    let squared = 0;
    for (const row of included) {
      const error = row[key] - row.actual;
      absolute += Math.abs(error);
      signed += error;
      squared += error ** 2;
    }
    assert.equal(result.metrics[key].n, 166);
    close(result.metrics[key].mae, absolute / 166);
    close(result.metrics[key].bias, signed / 166);
    close(result.metrics[key].rmse, Math.sqrt(squared / 166));
  }
});
