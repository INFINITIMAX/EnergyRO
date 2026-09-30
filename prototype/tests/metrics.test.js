import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMetrics, evaluateCommonSupport } from '../src/metrics.js';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);

test('MAE, forecast-minus-actual bias and RMSE have independently calculated values', () => {
  // Errors: +2, -3, 0; absolute sum 5; signed sum -1; squared sum 13.
  const result = calculateMetrics([10, 20, 0], [12, 17, 0]);
  assert.equal(result.n, 3);
  close(result.mae, 5 / 3);
  close(result.bias, -1 / 3);
  close(result.rmse, Math.sqrt(13 / 3));
  assert.deepEqual(calculateMetrics([0], [0]), { n: 1, mae: 0, bias: 0, rmse: 0 });
});

test('null, undefined, NaN, infinities and numeric strings are excluded on either side', () => {
  const invalid = [null, undefined, NaN, Infinity, -Infinity, '0'];
  for (const value of invalid) {
    assert.deepEqual(calculateMetrics([0, value, 4], [0, 9, value]), { n: 1, mae: 0, bias: 0, rmse: 0 });
  }
});

test('empty or entirely missing pair support returns null metrics, not fabricated zero', () => {
  const empty = { n: 0, mae: null, bias: null, rmse: null };
  assert.deepEqual(calculateMetrics([], []), empty);
  assert.deepEqual(calculateMetrics([null, NaN], [1, Infinity]), empty);
});

test('pair arrays must be arrays with equal lengths', () => {
  for (const [actual, predicted] of [[null, []], [[], {}], ['0', [0]], [[1], []], [[], [1]]]) {
    assert.throws(() => calculateMetrics(actual, predicted), TypeError);
  }
});

test('all comparators share support and coverage uses every input interval', () => {
  const rows = [
    { actual: 0, model: 2, official: 0, baseline: -1 },
    { actual: 10, model: 8, official: 14, baseline: 13 },
    { actual: 100, model: 500, official: null, baseline: 100 },
    { actual: null, model: 1, official: 2, baseline: 3 },
    { actual: 1, model: NaN, official: 2, baseline: 3 },
    { actual: 1, model: 2, official: 3, baseline: Infinity },
    null,
  ];
  const result = evaluateCommonSupport(rows);
  assert.equal(result.total, 7);
  assert.equal(result.n, 2);
  assert.equal(result.excluded, 5);
  close(result.coverage, 2 / 7);
  assert.deepEqual(result.metrics.model, { n: 2, mae: 2, bias: 0, rmse: 2 });
  close(result.metrics.official.mae, 2);
  close(result.metrics.official.bias, 2);
  close(result.metrics.official.rmse, Math.sqrt(8));
  close(result.metrics.baseline.mae, 2);
  close(result.metrics.baseline.bias, 1);
  close(result.metrics.baseline.rmse, Math.sqrt(5));
  assert.equal(result.metrics.official.n, 2);
  assert.equal(result.metrics.baseline.n, 2);
});

test('custom comparator keys define the common support without requiring other series', () => {
  const rows = [{ actual: 0, model: 0, official: null }, { actual: 2, model: 4, official: 7 }];
  const snapshot = structuredClone(rows);
  const result = evaluateCommonSupport(rows, ['model']);
  assert.deepEqual(result, { total: 2, n: 2, excluded: 0, coverage: 1,
    metrics: { model: { n: 2, mae: 1, bias: 1, rmse: Math.sqrt(2) } } });
  assert.deepEqual(rows, snapshot);
});

test('empty rows and zero common support distinguish undefined coverage from zero coverage', () => {
  const emptyMetric = { n: 0, mae: null, bias: null, rmse: null };
  assert.deepEqual(evaluateCommonSupport([], ['model']), {
    total: 0, n: 0, excluded: 0, coverage: null, metrics: { model: emptyMetric },
  });
  assert.deepEqual(evaluateCommonSupport([{ actual: 0, model: null }], ['model']), {
    total: 1, n: 0, excluded: 1, coverage: 0, metrics: { model: emptyMetric },
  });
});

test('common support rejects non-arrays, empty or duplicate comparator lists', () => {
  for (const [rows, keys] of [[null, ['model']], [{}, ['model']], [[], null], [[], 'model'], [[], []], [[], ['model', 'model']]]) {
    assert.throws(() => evaluateCommonSupport(rows, keys), TypeError);
  }
});
