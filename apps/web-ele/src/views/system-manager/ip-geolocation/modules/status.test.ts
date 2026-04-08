import { describe, expect, it } from 'vitest';

import {
  formatFileSize,
  getSourceLabel,
  validateIp2regionFile,
} from './status';

describe('ip geolocation helpers', () => {
  it('maps runtime source to readable labels', () => {
    expect(getSourceLabel('managed-active')).toBe('托管 active 库');
    expect(getSourceLabel('configured-path')).toBe('环境变量指定路径');
    expect(getSourceLabel('default-path')).toBe('仓库默认库');
    expect(getSourceLabel('unavailable')).toBe('当前不可用');
  });

  it('accepts only ip2region_v4.xdb upload file', () => {
    expect(validateIp2regionFile(
      new File(['xdb'], 'ip2region_v4.xdb'),
    )).toEqual({ valid: true });

    expect(validateIp2regionFile(
      new File(['xdb'], 'custom.xdb'),
    )).toEqual({
      valid: false,
      message: '仅支持上传 ip2region_v4.xdb 文件',
    });
  });

  it('formats file size for display', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(null)).toBe('-');
  });
});
