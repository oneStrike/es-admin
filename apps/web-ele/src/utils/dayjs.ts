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
 * 格式化 UTC 时间
 * @param date 日期
 * @param format 格式字符串，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的字符串
 */
export const formatUTC = (
  date: dayjs.ConfigType,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  // 处理空值
  if (!date) {
    return '';
  }
  return dayjs(date).utcOffset(8).format(format);
};

// 默认导出配置好的 dayjs 实例
export default dayjsUTC;
