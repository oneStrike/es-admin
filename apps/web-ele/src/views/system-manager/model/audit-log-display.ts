import { safeParseJson } from '#/utils';

export type AuditDeviceField = 'browser' | 'device' | 'os' | 'version';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function normalizeAuditDeviceValue(value: unknown) {
  if (typeof value !== 'string') return value;

  return safeParseJson(value) ?? value;
}

function stringifyDisplayValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function formatAuditDeviceField(
  value: unknown,
  field: AuditDeviceField,
) {
  const normalizedValue = normalizeAuditDeviceValue(value);

  if (isRecord(normalizedValue)) {
    return stringifyDisplayValue(normalizedValue[field]);
  }

  return field === 'browser' ? stringifyDisplayValue(normalizedValue) : '-';
}
