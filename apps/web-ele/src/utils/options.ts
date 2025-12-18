/**
 * 选项接口定义
 * @interface Options
 * @property {string} label - 选项的显示文本
 * @property {boolean | number | string} value - 选项的值
 */
export interface Options {
  label: string;
  value: boolean | number | string;
}

/**
 * 将选项数组转换为映射对象
 * @param {Options[]} options - 选项数组
 * @returns {Record<string | number | symbol, string>} 以选项值为键、选项标签为值的映射对象
 */
export const optionsToMap = (options: Options[]) => {
  return Object.fromEntries(
    options.map((option) => [
      // 将boolean类型的value转换为字符串，避免类型错误
      typeof option.value === 'boolean'
        ? option.value.toString()
        : option.value,
      option.label,
    ]),
  );
};

/**
 * 将映射对象转换为选项数组
 * @param {Record<number, string>} map - 以数字为键、字符串为值的映射对象
 * @returns {Options[]} 选项数组
 */
export const mapToOptions = (map: Record<number, string>) => {
  return Object.entries(map).map(([value, label]) => ({
    label,
    value,
  }));
};

/**
 * 根据值或值数组获取选项标签的拼接字符串
 * @param {Options[]} options - 选项数组
 * @param {Options['value'] | Options['value'][]} value - 单个值或值数组
 * @returns {string} 选项标签的拼接字符串，使用顿号分隔
 */
export const getOptionLabel = (
  options: Options[],
  value: Options['value'] | Options['value'][],
): string => {
  const map = optionsToMap(options);
  // 处理单个值的情况，将其转换为数组
  const values = Array.isArray(value) ? value : [value];
  return values
    .map((v) => {
      // 将value转换为字符串以匹配map的键类型
      const key = typeof v === 'boolean' ? v.toString() : v;
      return map[key];
    })
    .join('、');
};
