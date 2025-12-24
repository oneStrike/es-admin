import type { VxeGridProps } from '@vben/plugins/vxe-table';
import type { Recordable } from '@vben/types';

import type { EsFormSchema } from '#/types';

/**
 * 选择模式类型
 */
export type TableSelectMode = 'multiple' | 'single';

/**
 * 选中项类型
 */
export interface TableSelectOption {
  /**
   * 值
   */
  value: any;
  /**
   * 标签
   */
  label: string;
  /**
   * 原始数据
   */
  raw?: Recordable<any>;
}

/**
 * 表格选择组件属性
 */
export interface EsTableSelectProps {
  /**
   * 绑定值
   */
  modelValue?: Recordable<any>[];
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 多选模式下的最大选中数量
   */
  multipleLimit?: number;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 表格列配置
   */
  columns: VxeGridProps['columns'];
  /**
   * 表格数据获取方法
   */
  api: (params: Recordable<any>) => Promise<{ list: any[]; total: number }>;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 表格属性配置
   */
  gridProps?: Partial<VxeGridProps>;
  /**
   * 弹窗标题
   */
  title?: string;
  /**
   * 弹窗宽度
   */
  width?: number | string;
  /**
   * 搜索字段配置
   */
  searchSchema?: EsFormSchema;
  /**
   * 用户选中数据回显的字段
   */
  displayField?: string;
  /**
   * 唯一标识字段
   */
  keyField?: string;
  /**
   * 是否只需要keyField字段，反之则返回整个选中项
   */
  onlyKey?: boolean;
}

/**
 * 表格选择组件事件
 */
export interface EsTableSelectEmits {
  /**
   * 绑定值变化事件
   */
  (e: 'update:modelValue', value: any | any[]): void;
  /**
   * 选中项变化事件
   */
  (
    e: 'selectChange',
    options: TableSelectOption | TableSelectOption[] | undefined,
  ): void;
}

/**
 * 表格选择组件暴露的方法
 */
export interface EsTableSelectExpose {
  /**
   * 获取当前所有选中的数据
   * @returns 选中的数据数组
   */
  getSelectedData: () => any[];
}
