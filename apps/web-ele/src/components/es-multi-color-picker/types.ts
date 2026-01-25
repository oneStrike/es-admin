/**
 * 颜色项
 */
export interface ColorItem {
  /**
   * 颜色名称
   */
  name: string;
  /**
   * 颜色值
   */
  color: string;
}

/**
 * 多颜色选择组件属性
 */
export interface EsMultiColorPickerProps {
  /**
   * 绑定值，JSON 格式的颜色项数组字符串
   */
  modelValue?: string;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 最大颜色数量
   */
  maxCount?: number;
}

/**
 * 多颜色选择组件事件
 */
export interface EsMultiColorPickerEmits {
  /**
   * 绑定值变化事件
   */
  (e: 'update:modelValue', value: string): void;
}

/**
 * 多颜色选择组件暴露的方法
 */
export interface EsMultiColorPickerExpose {
  /**
   * 获取当前所有选中的颜色项
   * @returns 颜色项数组
   */
  getColors: () => ColorItem[];
}
