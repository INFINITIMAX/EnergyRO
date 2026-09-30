export const TIME_ZONE = 'Europe/Bucharest';
export const SERIES = ['model', 'official', 'baseline'];
export const SCENES = ['clear', 'rain', 'storm', 'snow', 'night'];
const scenarios = ['clear', 'rain', 'storm', 'snow', 'night', 'clear', 'rain'];
const temperatures = [4, 6, 7, -2, -4, 2, 5];
const round = value => Math.round(value);

export function formatLocalDate(utc) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE, day: '2-digit', month: '2-digit', year: 'numeric',
  }).formatToParts(new Date(utc));
  const part = type => parts.find(p => p.type === type).value;
  return `${part('day')}-${part('month')}-${part('year')}`;
}

export function formatLocalTime(utc) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(new Date(utc));
}

export function localZoneLabel(utc) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE, timeZoneName: 'short',
  }).formatToParts(new Date(utc)).find(p => p.type === 'timeZoneName').value;
}

/** Fixed winter fixture, not a general DST day generator. All timestamps stored in UTC. */
export function createDemoDays() {
  return Array.from({ length: 7 }, (_, dayIndex) => {
    const start = Date.UTC(2026, 11, 6 + dayIndex, 22); // 07-12-2026 00:00 Bucharest
    const issuedAt = new Date(start - 14 * 3600000).toISOString();
    const rows = Array.from({ length: 24 }, (_, hour) => {
      const targetTime = new Date(start + hour * 3600000).toISOString();
      const actualValue = round(6100 + dayIndex * 95 + 570 * Math.sin((hour - 7) * Math.PI / 12)
        + 880 * Math.exp(-((hour - 18) ** 2) / 10) + 270 * Math.exp(-((hour - 9) ** 2) / 7));
      const model = round(actualValue + 90 * Math.sin(hour * 0.8 + dayIndex) + 30);
      const official = round(actualValue + 125 * Math.cos(hour * 0.55 + dayIndex) - 40);
      const baseline = round(actualValue + 220 * Math.sin(hour * 0.4 + dayIndex) + 110);
      const consumption = model;
      const netImport = round(290 + 180 * Math.sin(hour * 0.3 + dayIndex));
      const generation = consumption - netImport;
      const nuclear = 1320;
      const wind = round(680 + dayIndex * 75 + 140 * Math.cos(hour * 0.3));
      const solar = round(Math.max(0, 480 * Math.sin((hour - 8) * Math.PI / 8)) * (hour <= 16 ? 1 : 0));
      const hydro = round(generation * 0.25);
      const coal = round(generation * 0.19);
      const gas = generation - nuclear - wind - solar - hydro - coal;
      return {
        target_time: targetTime,
        issued_at: issuedAt,
        model_version: 'synthetic-v1',
        source: 'DEMO deterministic fixture — no upstream connection',
        forecasts: {
          model: { value: model, issued_at: issuedAt, target_time: targetTime, model_version: 'synthetic-v1', source: 'DEMO model' },
          official: { value: official, issued_at: issuedAt, target_time: targetTime, model_version: 'synthetic-official-v1', source: 'DEMO official comparator, not ENTSO-E' },
          baseline: { value: baseline, issued_at: issuedAt, target_time: targetTime, model_version: 'synthetic-baseline-v1', source: 'DEMO baseline' },
        },
        // Deliberate missing observations demonstrate common support, never a filled value.
        actual: dayIndex === 3 && hour === 4 ? null : actualValue,
        model, official: dayIndex === 2 && hour === 11 ? null : official, baseline,
        consumption, generation, netImport,
        mix: { nuclear, hydro, wind, solar, coal, gas },
      };
    });
    return {
      id: `demo-${dayIndex}`, date: formatLocalDate(rows[0].target_time), scene: scenarios[dayIndex],
      temperature: temperatures[dayIndex], wind: 12 + dayIndex * 3,
      rows, issued_at: issuedAt,
    };
  });
}

export const DEMO_DAYS = createDemoDays();
