export function normalizeSearchBoolean(value: unknown) {
  return typeof value === 'boolean' ? value : undefined;
}

export function normalizeSearchNumber(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

export function normalizeSearchText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export function splitSearchDateRange(value: unknown) {
  const [startValue, endValue] = Array.isArray(value) ? value : [];

  return {
    endDate: normalizeSearchText(endValue),
    startDate: normalizeSearchText(startValue),
  };
}
