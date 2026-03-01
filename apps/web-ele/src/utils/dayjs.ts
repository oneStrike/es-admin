import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// 扩展 dayjs 插件
dayjs.extend(utc);

/**
 * 配置了 UTC 和常用插件的 dayjs 实例
 * 默认使用 UTC 时区
 */
export const dayjsUTC = dayjs;

/**
 * 根据输入自动推断合适的格式
 * - 时间戳或含时间的字符串 → 'YYYY-MM-DD HH:mm:ss'
 * - 纯日期字符串 → 'YYYY-MM-DD'
 */
function inferFormat(date: dayjs.ConfigType): string {
  // 数字时间戳，使用完整格式
  if (typeof date === 'number') {
    return 'YYYY-MM-DD HH:mm:ss';
  }

  // 字符串类型，根据内容判断
  if (typeof date === 'string') {
    const trimmed = date.trim();
    // ISO 日期格式 (YYYY-MM-DD) 或类似格式
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return 'YYYY-MM-DD';
    }
    // 含时间部分
    if (/\d{2}:\d{2}/.test(trimmed)) {
      return 'YYYY-MM-DD HH:mm:ss';
    }
  }

  // 默认使用完整格式
  return 'YYYY-MM-DD HH:mm:ss';
}

/**
 * 格式化 UTC 时间
 * @param date 日期
 * @param format 格式字符串，不传时自动推断
 * @returns 格式化后的字符串
 */
export const formatUTC = (date: dayjs.ConfigType, format?: string) => {
  // 处理空值
  if (!date) {
    return '';
  }
  const finalFormat = format ?? inferFormat(date);
  return dayjs(date).utcOffset(8).format(finalFormat);
};

// 默认导出配置好的 dayjs 实例
export default dayjsUTC;
