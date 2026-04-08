const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

const SOURCE_LABEL_MAP: Record<string, string> = {
  'configured-path': '环境变量指定路径',
  'default-path': '仓库默认库',
  'managed-active': '托管 active 库',
  unavailable: '当前不可用',
};

export function getSourceLabel(source?: null | string) {
  if (!source) return '-';
  return SOURCE_LABEL_MAP[source] ?? source;
}

export function formatFileSize(fileSize?: null | number) {
  if (fileSize === null || fileSize === undefined || Number.isNaN(fileSize)) {
    return '-';
  }

  let value = fileSize;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < FILE_SIZE_UNITS.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const precision = value >= 10 || unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(precision)} ${FILE_SIZE_UNITS[unitIndex]}`;
}

export function validateIp2regionFile(file: File) {
  if (file.name !== 'ip2region_v4.xdb') {
    return {
      valid: false,
      message: '仅支持上传 ip2region_v4.xdb 文件',
    } as const;
  }

  return { valid: true } as const;
}
