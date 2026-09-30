import { useEffect, useState } from 'react';
import Atmosphere, { useReducedMotion } from './Atmosphere.jsx';
import HourlyChart from './HourlyChart.jsx';
import { DEMO_DAYS, SERIES, TIME_ZONE, formatLocalTime, localZoneLabel } from './demo-data.js';
import { translations } from './i18n.js';
import { evaluateCommonSupport } from './metrics.js';

const pages = ['forecast', 'system', 'evaluation', 'methodology'];
const evaluation = evaluateCommonSupport(DEMO_DAYS.flatMap(day => day.rows));
const mixKeys = ['nuclear', 'hydro', 'wind', 'solar', 'coal', 'gas'];

export default function App() {
  const [page, setPage] = useState('forecast');
  const [language, setLanguage] = useState('ro');
  const [dayIndex, setDayIndex] = useState(0);
  const [hour, setHour] = useState(12);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const t = translations[language];
  const day = DEMO_DAYS[dayIndex];
  const row = day.rows[hour];
  const number = value => new Intl.NumberFormat(language === 'ro' ? 'ro-RO' : 'en-GB', {
    maximumFractionDigits: 1,
  }).format(value);
  const value = amount => Number.isFinite(amount) ? `${number(amount)} MW` : t.missing;
  const text = (ro, en) => language === 'ro' ? ro : en;
  const fixtureConflict = Number.isFinite(row.forecasts.official.value) && !Number.isFinite(row.official);

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  return <div className={`app scene-${day.scene} ${paused ? 'is-paused' : ''} ${reduced ? 'motion-reduced' : ''}`}>
    <Atmosphere scene={day.scene} paused={paused} reduced={reduced} />
    <a className="skip-link" href="#main-content">{t.skip}</a>
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#main-content">EnergyRO</a>
        <span className="demo-badge">{t.demo}</span>
        <nav className="main-nav" aria-label={text('Pagini locale', 'Local pages')}>
          {pages.map(name => <button key={name} type="button" aria-current={page === name ? 'page' : undefined}
            className={page === name ? 'is-active' : ''} onClick={() => setPage(name)}>{t[name]}</button>)}
        </nav>
        <div className="header-controls">
          <label htmlFor="language">{t.language}</label>
          <select id="language" value={language} onChange={event => setLanguage(event.target.value)}>
            <option value="ro">RO</option><option value="en">EN</option>
          </select>
          <button type="button" aria-pressed={paused} onClick={() => setPaused(current => !current)}>{paused ? t.resume : t.pause}</button>
          {reduced && <span className="small">{t.reduced}</span>}
        </div>
      </header>

      <main id="main-content" tabIndex="-1">
        {page === 'forecast' && <>
          <section className="forecast-hero" aria-labelledby="forecast-title">
            <div className="hero-reading">
              <p className="eyebrow">{t.region}</p><h1 id="forecast-title">{t.winter}</h1><p>{t.lead}</p>
              <p className="reading-label">{t.estimate}</p>
              <p className="big-reading" aria-live="polite"><span>{number(row.model)}</span> <span className="unit">MW</span></p>
              <p>{day.date} · {formatLocalTime(row.target_time)} · {localZoneLabel(row.target_time)}</p>
            </div>
            <div className="hero-context">
              <section className="glass context-panel" aria-labelledby="context-title">
                <h2 id="context-title">{t.context}</h2><p>{t[day.scene]} · DEMO</p>
                <dl className="stat-list"><div><dt>{t.temperature}</dt><dd>{number(day.temperature)} °C</dd></div>
                  <div><dt>{t.wind}</dt><dd>{number(day.wind)} km/h</dd></div></dl>
                <p className="small">{t.weather}</p>
                <p className="small">{text('Cerul ilustrativ nu indică risc de blackout.', 'The illustrative sky does not indicate blackout risk.')}</p>
              </section>
              <section className="glass comparison-panel" aria-labelledby="comparison-title">
                <h2 id="comparison-title">{t.comparison}</h2>
                <dl className="stat-list">{[...SERIES, 'actual'].map(key => <div key={key} className={`comparison-${key}`}>
                  <dt>{t[key]}</dt><dd>{value(row[key])}</dd></div>)}</dl><p className="small">{t.noOfficial}</p>
                {fixtureConflict && <p className="data-warning" role="status">{text(
                  'Neconcordanță DEMO: seria oficială lipsește, deși metadatele fixture-ului conțin o valoare. Afișăm Lipsă; nu completăm seria.',
                  'DEMO inconsistency: the official series is missing although fixture metadata contains a value. We display Missing; no imputation.')} </p>}
              </section>
            </div>
          </section>
          <HourlyChart day={day} hour={hour} onHour={setHour} t={t} number={number} />
        </>}

        {page === 'system' && <section className="system-page" aria-labelledby="system-title">
          <p className="eyebrow">DEMO</p><h1 id="system-title">{t.systemTitle}</h1><p>{t.systemLead}</p>
          <div className="glass balance-panel"><dl className="stat-list">
            <div><dt>{t.consumption}</dt><dd>{value(row.consumption)}</dd></div>
            <div><dt>{t.generation}</dt><dd>{value(row.generation)}</dd></div>
            <div><dt>{row.netImport >= 0 ? t.imports : t.exports}</dt><dd>{value(Math.abs(row.netImport))}</dd></div>
          </dl><p>{t.balance}: {number(row.generation)} + ({number(row.netImport)}) = {number(row.consumption)} MW</p></div>
          <section className="glass mix-panel" aria-labelledby="mix-title"><h2 id="mix-title">{t.mix}</h2>
            <dl className="mix-list">{mixKeys.map(key => <div key={key}><dt>{key === 'wind' ? t.windSource : t[key]}</dt>
              <dd>{value(row.mix[key])}</dd></div>)}</dl><p>{t.mixNote}</p><p className="small">{t.fixture}</p>
          </section>
        </section>}

        {page === 'evaluation' && <section className="evaluation-page" aria-labelledby="evaluation-title">
          <p className="eyebrow">DEMO</p><h1 id="evaluation-title">{t.evalTitle}</h1><p>{t.evalLead}</p>
          <div className="glass evaluation-panel">
            <p>{t.period}: {DEMO_DAYS[0].date} — {DEMO_DAYS[6].date} · {TIME_ZONE}</p>
            <dl className="stat-list"><div><dt>{t.support}</dt><dd>{evaluation.n} / {evaluation.total} {t.sample}</dd></div>
              <div><dt>{t.coverage}</dt><dd>{evaluation.coverage === null ? t.missing : `${number(evaluation.coverage * 100)}%`}</dd></div>
              <div><dt>{t.excluded}</dt><dd>{evaluation.excluded}</dd></div></dl>
            <div className="table-scroll" tabIndex="0" role="region" aria-label={t.evaluation}>
              <table><caption>{t.evaluation} · DEMO · {t.support}</caption><thead><tr>
                <th scope="col">{t.comparison}</th><th scope="col">MAE (MW)</th><th scope="col">Bias (MW)</th><th scope="col">RMSE (MW)</th><th scope="col">N</th>
              </tr></thead><tbody>{SERIES.map(key => <tr key={key}><th scope="row">{t[key]}</th>
                {['mae', 'bias', 'rmse'].map(metric => <td key={metric}>{Number.isFinite(evaluation.metrics[key][metric]) ? number(evaluation.metrics[key][metric]) : t.missing}</td>)}
                <td>{evaluation.metrics[key].n}</td></tr>)}</tbody></table>
            </div><p>{t.metricNote}</p>
            <p className="small">{text('Se folosesc câmpurile seriilor, nu valorile din metadate. Goluri: oficial 09-12-2026 11:00; observat 10-12-2026 04:00 (Europe/Bucharest).',
              'Series fields are used, not metadata values. Gaps: official 09-12-2026 11:00; observed 10-12-2026 04:00 (Europe/Bucharest).')}</p>
          </div>
        </section>}

        {page === 'methodology' && <section className="methodology-page" aria-labelledby="methodology-title">
          <p className="eyebrow">DEMO</p><h1 id="methodology-title">{t.methodTitle}</h1><p>{t.methodLead}</p>
          <div className="method-grid">{['implemented', 'planned', 'limits', 'next'].map(key => <section className="glass method-card" key={key}>
            <h2>{t[key]}</h2><p>{t[`${key}Body`]}</p></section>)}</div>
          <section className="glass provenance-panel" aria-labelledby="provenance-title"><h2 id="provenance-title">{t.provenance}</h2>
            <p>{t.fixture}</p>
            {SERIES.map(key => { const forecast = row.forecasts[key]; return <section className="forecast-provenance" key={key}>
              <h3>{t[key]} · {value(row[key])}</h3>
              <dl><div><dt>{t.source}</dt><dd>{forecast.source}</dd></div>
                <div><dt>{t.issued} (issued_at)</dt><dd><time dateTime={forecast.issued_at}>{forecast.issued_at}</time></dd></div>
                <div><dt>{t.target} (target_time)</dt><dd><time dateTime={forecast.target_time}>{forecast.target_time}</time></dd></div>
                <div><dt>{t.version} (model_version)</dt><dd>{forecast.model_version}</dd></div></dl>
            </section>; })}
            <p className="data-warning">{text('Fixture-ul are o neconcordanță: la 09-12-2026 11:00, official este null, dar forecasts.official.value este numeric. UI și evaluarea păstrează lipsa din serie.',
              'The fixture is inconsistent: at 09-12-2026 11:00, official is null but forecasts.official.value is numeric. UI and evaluation preserve the series gap.')}</p>
          </section>
        </section>}
        <section className="selection-panel glass" aria-labelledby="days-title">
          <div className="section-heading"><h2 id="days-title">{t.days}</h2><p>{t.skyFollows}</p></div>
          <div className="day-strip">
            {DEMO_DAYS.map((item, index) => <button key={item.id} type="button" className={`day-button ${index === dayIndex ? 'is-selected' : ''}`}
              aria-pressed={index === dayIndex} onClick={() => setDayIndex(index)}>
              <span>{item.date}</span><span>{t[item.scene]}</span><span>DEMO</span>
            </button>)}
          </div>
          <div className="selected-time">
            <label htmlFor="global-hour">{t.selected}</label>
            <select id="global-hour" value={hour} onChange={event => setHour(Number(event.target.value))}>
              {day.rows.map((item, index) => <option key={item.target_time} value={index}>{formatLocalTime(item.target_time)}</option>)}
            </select>
            <span>{day.date} · {TIME_ZONE} · {localZoneLabel(row.target_time)}</span>
          </div>
        </section>
      </main>
      <footer className="site-footer"><p>{t.demo}</p><p>{t.footer}</p></footer>
    </div>
  </div>;
}
