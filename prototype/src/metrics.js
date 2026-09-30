/** MW errors on a common finite support. Zero is a valid observation.
 * Bias convention: forecast - actual. Missing values are never imputed.
 */
export function calculateMetrics(actual, predicted) {
  if (!Array.isArray(actual) || !Array.isArray(predicted) || actual.length !== predicted.length) {
    throw new TypeError('Expected equally sized arrays');
  }
  const errors = actual.flatMap((value, i) =>
    Number.isFinite(value) && Number.isFinite(predicted[i]) ? [predicted[i] - value] : []);
  const n = errors.length;
  return {
    n,
    mae: n ? errors.reduce((sum, e) => sum + Math.abs(e), 0) / n : null,
    bias: n ? errors.reduce((sum, e) => sum + e, 0) / n : null,
    rmse: n ? Math.sqrt(errors.reduce((sum, e) => sum + e * e, 0) / n) : null,
  };
}

export function evaluateCommonSupport(rows, keys = ['model', 'official', 'baseline']) {
  if (!Array.isArray(rows) || !Array.isArray(keys) || !keys.length || new Set(keys).size !== keys.length) {
    throw new TypeError('Expected rows and distinct forecast keys');
  }
  const common = rows.filter(row => row && Number.isFinite(row.actual) && keys.every(key => Number.isFinite(row[key])));
  return {
    total: rows.length,
    n: common.length,
    coverage: rows.length ? common.length / rows.length : null,
    excluded: rows.length - common.length,
    metrics: Object.fromEntries(keys.map(key => [key, calculateMetrics(common.map(row => row.actual), common.map(row => row[key]))])),
  };
}
