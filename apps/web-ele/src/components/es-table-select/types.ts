import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { EsFormSchema } from '#/types';

export type TableSelectMode = 'multiple' | 'single';

export type TableSelectValue = number | string;
export type TableSelectRow = Record<string, unknown>;

export interface TableSelectOption {
  value: TableSelectValue;
  label: string;
  raw?: TableSelectRow;
}

export interface EsTableSelectProps {
  modelValue?: TableSelectRow[] | TableSelectValue[];
  multiple?: boolean;
  multipleLimit?: number;
  placeholder?: string;
  columns: VxeGridProps<TableSelectRow>['columns'];
  api: (params: Record<string, unknown>) => Promise<{
    list: TableSelectRow[];
    total: number;
  }>;
  disabled?: boolean;
  gridProps?: Partial<VxeGridProps<TableSelectRow>>;
  title?: string;
  width?: number | string;
  searchSchema?: EsFormSchema;
  displayField?: string;
  keyField?: string;
  onlyKey?: boolean;
}

export interface EsTableSelectEmits {
  (e: 'update:modelValue', value: TableSelectRow[] | TableSelectValue[]): void;
  (
    e: 'selectChange',
    options: TableSelectOption | TableSelectOption[] | undefined,
  ): void;
}

export interface EsTableSelectExpose {
  getSelectedData: () => TableSelectRow[];
}
