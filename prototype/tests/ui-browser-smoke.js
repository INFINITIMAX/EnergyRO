async page => {
  const errors = [];
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`console.error: ${message.text()}`);
  });
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));

  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const text = locator => locator.textContent().then(value => (value || '').replace(/\s+/g, ' ').trim());
  const visible = async (locator, message) => assert(await locator.isVisible(), message);
  const noErrors = () => assert(errors.length === 0, `Browser errors detected:\n${errors.join('\n')}`);
  const waitClass = async cls => page.waitForFunction(c => document.querySelector('.app')?.classList.contains(c), cls);
  const assertNoDocOverflow = async label => {
    const sizes = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
    assert(sizes.scrollWidth <= sizes.innerWidth + 1, `${label}: document overflow ${sizes.scrollWidth} > ${sizes.innerWidth}`);
  };
  const nav = async label => {
    await page.getByRole('button', { name: label }).click();
    await page.locator('.main-nav button[aria-current="page"]').filter({ hasText: label }).waitFor();
  };
  const chooseDay = async index => {
    await page.locator('.day-button').nth(index).click();
    await page.waitForFunction(i => document.querySelectorAll('.day-button')[i]?.getAttribute('aria-pressed') === 'true', index);
  };
  const chooseHour = async index => {
    await page.locator('#global-hour').selectOption(String(index));
    await page.waitForFunction(i => document.querySelector('#global-hour')?.value === String(i), index);
  };

  await page.reload();
  await page.locator('.app').waitFor();
  await visible(page.getByRole('heading', { name: /O perspectivă asupra zilei de iarnă\./ }), 'Forecast heading is not visible');
  await visible(page.locator('.demo-badge'), 'DEMO badge is not visible');
  assert((await text(page.locator('body'))).includes('DEMO'), 'DEMO text missing from page');
  assert(await page.evaluate(() => document.documentElement.lang) === 'ro', 'Initial document lang should be ro');
  await visible(page.locator('.big-reading'), 'Hero forecast number is not visible');
  assert(/MW/.test(await text(page.locator('.big-reading'))), 'Hero forecast number should expose MW');
  await visible(page.locator('.hourly-chart'), 'Hourly chart is not visible');

  const beforeHour = await text(page.locator('.big-reading'));
  await page.locator('#selected-hour').focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(old => document.querySelector('.big-reading')?.textContent?.replace(/\s+/g, ' ').trim() !== old, beforeHour);
  assert(await page.locator('#selected-hour').inputValue() === '13', 'ArrowRight should advance selected hour to 13');
  assert(await page.locator('#global-hour').inputValue() === '13', 'Global hour select should sync with chart slider');

  await chooseHour(11);
  await chooseDay(2);
  const officialWarning = page.locator('.comparison-panel [role="status"]');
  await visible(officialWarning, 'Official missing warning is not visible at day 3 / hour 11');
  assert((await text(page.locator('.comparison-panel'))).includes('Lipsă'), 'Official missing value should be rendered as Lipsă');
  assert((await text(officialWarning)).includes('nu completăm seria'), 'Warning should state that missing official data is not imputed');

  await chooseDay(3);
  await chooseHour(4);
  assert((await text(page.locator('.chart-reading'))).includes('Observat DEMO: Lipsă'), 'Observed missing value should be exposed at day 4 / hour 4');

  await nav('Sistem energetic');
  await visible(page.getByRole('heading', { name: /Energia, în echilibru\./ }), 'System page heading missing');
  await nav('Evaluare');
  await visible(page.getByRole('heading', { name: /Mai întâi, comparabilitate\./ }), 'Evaluation heading missing');
  assert((await text(page.locator('.evaluation-panel'))).includes('166 / 168'), 'Evaluation common support should be 166 / 168');
  const excluded = page.locator('.evaluation-panel .stat-list > div').filter({
    has: page.locator('dt', { hasText: /^intervale excluse$/ }),
  }).locator('dd');
  assert(await text(excluded) === '2', 'Evaluation excluded-interval count should be exactly 2');
  await nav('Metodologie');
  await visible(page.getByRole('heading', { name: /Transparent, de la început\./ }), 'Methodology heading missing');
  await nav('Prognoză');

  await page.locator('#language').selectOption('en');
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  await visible(page.getByRole('heading', { name: /A perspective on a winter day\./ }), 'English forecast heading missing');
  assert((await text(page.locator('.demo-badge'))).includes('DEMO'), 'English DEMO badge missing');
  await nav('Energy system');
  await visible(page.getByRole('heading', { name: /Energy, in balance\./ }), 'English system page heading missing');
  await nav('Evaluation');
  await visible(page.getByRole('heading', { name: /Comparability comes first\./ }), 'English evaluation heading missing');
  await nav('Methodology');
  await visible(page.getByRole('heading', { name: /Transparent, from the start\./ }), 'English methodology heading missing');
  await nav('Forecast');
  await page.locator('#language').selectOption('ro');
  await page.waitForFunction(() => document.documentElement.lang === 'ro');

  const pause = page.getByRole('button', { name: /Pauză animație/ });
  await pause.click();
  await waitClass('is-paused');
  assert(await page.getByRole('button', { name: /Pornește animația/ }).getAttribute('aria-pressed') === 'true', 'Pause button should set aria-pressed=true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await waitClass('motion-reduced');
  await visible(page.getByText('Mișcare redusă activă'), 'Reduced motion indicator missing');
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  const viewports = [{ width: 1440, height: 1000 }, { width: 390, height: 844 }];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await nav('Prognoză');
    for (const dayIndex of [0, 1, 2, 3, 4]) {
      await chooseDay(dayIndex);
      await visible(page.locator(`.sky.is-visible`).first(), `Visible sky missing for day ${dayIndex}`);
      await visible(page.locator('.big-reading'), `Hero reading missing for day ${dayIndex} at ${viewport.width}`);
      await assertNoDocOverflow(`viewport ${viewport.width} day ${dayIndex}`);
    }
    for (const pageName of ['Prognoză', 'Sistem energetic', 'Evaluare', 'Metodologie']) {
      await nav(pageName);
      await visible(page.locator('h1').first(), `${pageName} h1 missing at ${viewport.width}`);
      await assertNoDocOverflow(`viewport ${viewport.width} page ${pageName}`);
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await nav('Prognoză');
  await chooseDay(0);
  await chooseHour(12);
  if (await page.getByRole('button', { name: /Pornește animația/ }).isVisible().catch(() => false)) {
    await page.getByRole('button', { name: /Pornește animația/ }).click();
    await page.waitForFunction(() => !document.querySelector('.app')?.classList.contains('is-paused'));
  }
  assert(await page.evaluate(() => document.documentElement.lang) === 'ro', 'Final reset should leave lang=ro');
  noErrors();
  return { result: 'UI-001_BROWSER_SMOKE_PASS', consoleErrors: errors.length, viewports: [1440, 390], scenes: 5, pages: 4 };
}