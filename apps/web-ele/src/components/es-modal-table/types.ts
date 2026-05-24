import type { VbenFormProps } from '@vben/common-ui';
import type { VxeGridProps } from '@vben/plugins/vxe-table';

export type EsModalTableRow = Record<string, unknown> & {
  id?: number | string;
};

export type EsModalTableQuery = Record<string, unknown>;

export interface EsModalTableApiResult {
  list?: EsModalTableRow[];
  total?: number;
}

export interface EsModalTableProps {
  title?: string;
  width?: number | string;
  height?: number | string;
  columns?: VxeGridProps<EsModalTableRow>['columns'];
  api?: (params: EsModalTableQuery) => Promise<EsModalTableApiResult>;
  gridProps?: Partial<VxeGridProps<EsModalTableRow>>;
  searchSchema?: VbenFormProps;
  selectionMode?: 'multiple' | 'single';
  multipleLimit?: number;
  selectedRows?: EsModalTableRow[];
}

export interface EsModalTableEmits {
  (e: 'confirm' | 'select', selectedRows: EsModalTableRow[]): void;
}
