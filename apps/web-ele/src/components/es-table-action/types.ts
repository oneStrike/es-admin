import type { ActionItem, TableActionProps } from '@vben/common-ui';

export type EsTableActionItem = Omit<ActionItem, 'popConfirm'> & {
  popConfirm?: never;
};

export interface EsTableActionProps {
  actions?: EsTableActionItem[];
  align?: TableActionProps['align'];
  divider?: TableActionProps['divider'];
  dropdownActions?: EsTableActionItem[];
  hasPermission?: TableActionProps['hasPermission'];
  moreText?: TableActionProps['moreText'];
}
