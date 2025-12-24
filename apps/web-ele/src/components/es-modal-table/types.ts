import type { VbenFormProps } from '@vben/common-ui';
import type { VxeGridProps } from '@vben/plugins/vxe-table';
import type { Recordable } from '@vben/types';

/**
 * 表格模态框组件属性
 */
export interface EsModalTableProps {
  /**
   * 弹窗标题
   */
  title?: string;
  /**
   * 弹窗宽度
   */
  width?: number | string;
  /**
   * 表格高度
   */
  height?: number | string;
  /**
   * 表格列配置
   */
  columns?: VxeGridProps['columns'];
  /**
   * 表格数据获取方法
   */
  api?: (params: Recordable<any>) => Promise<any>;
  /**
   * 表格属性配置
   */
  gridProps?: Partial<VxeGridProps>;
  /**
   * 搜索字段配置
   */
  searchSchema?: VbenFormProps;
  /**
   * 表格选择模式
   */
  selectionMode?: 'multiple' | 'single';
  /**
   * 多选模式下的最大选中数量
   */
  multipleLimit?: number;
}

/**
 * 表格模态框组件事件
 */
export interface EsModalTableEmits {
  /**
   * 选择数据事件 | 确认选中数据事件
   */
  (e: 'confirm' | 'select', selectedRows: any[]): void;
}
