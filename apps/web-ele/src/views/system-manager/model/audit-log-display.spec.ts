import { describe, expect, it } from 'vitest';

import { loginLogColumns } from '../log-manager/login-log/model/shared';
import { operationLogColumns } from '../log-manager/operation-log/model/shared';
import { loginHistortColumn } from '../profile/model/shared';
import { formatAuditDeviceField } from './audit-log-display';

type FormattableColumn = {
  field?: unknown;
  formatter?: unknown;
  slots?: null | { default?: unknown };
};

function findColumn(columns: FormattableColumn[], field: string) {
  const column = columns.find((item) => item.field === field);
  if (!column) {
    throw new Error(`Cannot find column: ${field}`);
  }

  return column;
}

describe('audit log display formatting', () => {
  it('splits profile login history device values into separate columns', () => {
    expect(findColumn(loginHistortColumn, 'deviceOs')).toMatchObject({
      title: '操作系统',
    });
    expect(findColumn(loginHistortColumn, 'deviceType')).toMatchObject({
      title: '设备',
    });
    expect(findColumn(loginHistortColumn, 'deviceBrowser')).toMatchObject({
      title: '浏览器',
    });
    expect(findColumn(loginHistortColumn, 'deviceVersion')).toMatchObject({
      title: '版本',
    });
    expect(loginHistortColumn.some((item) => item.field === 'device')).toBe(
      false,
    );
  });

  it('splits login log device values into separate columns', () => {
    expect(findColumn(loginLogColumns, 'deviceOs')).toMatchObject({
      title: '操作系统',
    });
    expect(findColumn(loginLogColumns, 'deviceType')).toMatchObject({
      title: '设备',
    });
    expect(findColumn(loginLogColumns, 'deviceBrowser')).toMatchObject({
      title: '浏览器',
    });
    expect(findColumn(loginLogColumns, 'deviceVersion')).toMatchObject({
      title: '版本',
    });
    expect(loginLogColumns.some((item) => item.field === 'userAgent')).toBe(
      false,
    );
  });

  it('uses JSON cell renderer for operation log structured values', () => {
    expect(findColumn(operationLogColumns, 'device')).toMatchObject({
      cellRender: { name: 'CellJson' },
    });
    expect(findColumn(operationLogColumns, 'params')).toMatchObject({
      cellRender: { name: 'CellJson' },
    });
  });

  it('formats structured audit device fields from JSON strings', () => {
    const value =
      '{"os":"Windows","device":"Desktop","browser":"Chrome","version":"148"}';

    expect(formatAuditDeviceField(value, 'os')).toBe('Windows');
    expect(formatAuditDeviceField(value, 'device')).toBe('Desktop');
    expect(formatAuditDeviceField(value, 'browser')).toBe('Chrome');
    expect(formatAuditDeviceField(value, 'version')).toBe('148');
  });

  it('keeps legacy plain device strings visible in the browser column', () => {
    expect(formatAuditDeviceField('Mozilla/5.0', 'browser')).toBe(
      'Mozilla/5.0',
    );
    expect(formatAuditDeviceField('Mozilla/5.0', 'os')).toBe('-');
  });
});
