import { SERIES, formatLocalTime } from './demo-data.js';

const WIDTH = 1000;
const HEIGHT = 245;
const PAD = { left: 65, right: 24, top: 24, bottom: 40 };

export default function HourlyChart({ day, hour, onHour, t, number }) {
  const keys = [...SERIES, 'actual'];
  const values = day.rows.flatMap(row => keys.map(key => row[key])).filter(Number.isFinite);
  const min = Math.floor((Math.min(...values) - 150) / 500) * 500;
  const max = Math.ceil((Math.max(...values) + 150) / 500) * 500;
  const x = index => PAD.left + index / 23 * (WIDTH - PAD.left - PAD.right);
  const y = value => PAD.top + (max - value) / (max - min) * (HEIGHT - PAD.top - PAD.bottom);
  const path = key => {
    let open = false;
    return day.rows.map((row, index) => {
      if (!Number.isFinite(row[key])) { open = false; return ''; }
      const part = `${open ? 'L' : 'M'}${x(index)},${y(row[key])}`;
      open = true;
      return part;
    }).join(' ');
  };
  const selectPointer = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const svgX = (event.clientX - bounds.left) / bounds.width * WIDTH;
    onHour(Math.max(0, Math.min(23, Math.round((svgX - PAD.left) / (WIDTH - PAD.left - PAD.right) * 23))));
  };
  const selected = day.rows[hour];
  return <section className="glass chart-panel" aria-labelledby="hourly-title">
    <div className="section-heading"><h2 id="hourly-title">{t.hourly}</h2>
      <div className="legend">{keys.map(key => <span key={key}><i className={`line-key ${key}`} />{t[key]}</span>)}</div>
    </div>
    <p className="small muted" id="chart-help">{t.chartHelp}</p>
    <svg className="hourly-chart" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={t.chartLabel}
      onPointerDown={selectPointer} onPointerMove={event => { if (event.pointerType === 'mouse' || event.buttons) selectPointer(event); }}>
      <title>{t.chartLabel}</title>
      {[0, 0.5, 1].map(fraction => {
        const value = min + (max - min) * fraction;
        return <g key={fraction}><line className="grid-line" x1={PAD.left} x2={WIDTH - PAD.right} y1={y(value)} y2={y(value)} />
          <text x={PAD.left - 10} y={y(value) + 4} textAnchor="end">{number(value)}</text></g>;
      })}
      {[0, 3, 6, 9, 12, 15, 18, 21, 23].map(index => <text key={index} x={x(index)} y={HEIGHT - 12} textAnchor="middle">{formatLocalTime(day.rows[index].target_time)}</text>)}
      {keys.map(key => <path key={key} d={path(key)} className={`series-line ${key}`} />)}
      <line className="selection-line" x1={x(hour)} x2={x(hour)} y1={PAD.top} y2={HEIGHT - PAD.bottom} />
      {keys.filter(key => Number.isFinite(selected[key])).map(key => <circle key={key} cx={x(hour)} cy={y(selected[key])} r={key === 'model' ? 5 : 3} className={`series-dot ${key}`} />)}
    </svg>
    <div className="hour-control"><label htmlFor="selected-hour">{t.hour}: <strong>{formatLocalTime(selected.target_time)}</strong></label>
      <input id="selected-hour" type="range" min="0" max="23" step="1" value={hour} onChange={event => onHour(Number(event.target.value))}
        aria-describedby="chart-help" aria-valuetext={`${formatLocalTime(selected.target_time)}, ${number(selected.model)} MW`} />
      <output className="chart-reading" aria-live="polite">{keys.map(key => `${t[key]}: ${Number.isFinite(selected[key]) ? `${number(selected[key])} MW` : t.missing}`).join(' · ')}</output>
    </div>
    <details className="data-table"><summary>{t.table}</summary><div className="table-scroll" tabIndex="0" role="region" aria-label={t.table}>
      <table><caption>{day.date} · Europe/Bucharest · DEMO</caption><thead><tr><th scope="col">{t.hour}</th>{keys.map(key => <th scope="col" key={key}>{t[key]} (MW)</th>)}</tr></thead>
        <tbody>{day.rows.map((row, index) => <tr key={row.target_time} className={index === hour ? 'selected-row' : ''}><th scope="row"><button type="button" onClick={() => onHour(index)} aria-pressed={index === hour}>{formatLocalTime(row.target_time)}</button></th>
          {keys.map(key => <td key={key}>{Number.isFinite(row[key]) ? number(row[key]) : t.missing}</td>)}</tr>)}</tbody>
      </table></div></details>
  </section>;
}
