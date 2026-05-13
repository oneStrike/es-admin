import { ElMessage, ElMessageBox } from 'element-plus';

export const useMessage: typeof ElMessage = ElMessage;

type MaybePromise<T> = Promise<T> | T;

export type ConfirmType =
  | 'clear'
  | 'delete'
  | 'disable'
  | 'enable'
  | 'reset'
  | 'restore';

export interface UseConfirmOptions {
  cancelText?: string;
  confirmText?: string;
  content?: string;
  onCancel?: () => MaybePromise<void>;
  onConfirm?: () => MaybePromise<void>;
  showCancel?: boolean;
  successMessage?: false | string;
  title?: string;
  type?: ConfirmType;
}

export type UseConfirmResult = 'cancel' | 'confirm';

export type UseConfirm = (
  options: UseConfirmOptions,
) => Promise<UseConfirmResult>;

const confirmPresets: Record<
  ConfirmType,
  { content: string; successMessage: string }
> = {
  clear: {
    content: '是否清空当前数据？注意清空后无法恢复！！！',
    successMessage: '清空成功',
  },
  delete: {
    content: '是否删除当前数据？',
    successMessage: '删除成功',
  },
  disable: {
    content: '是否禁用当前数据？',
    successMessage: '禁用成功',
  },
  enable: {
    content: '是否启用当前数据？',
    successMessage: '启用成功',
  },
  reset: {
    content: '是否重置当前数据？',
    successMessage: '重置成功',
  },
  restore: {
    content: '是否恢复当前数据？',
    successMessage: '恢复成功',
  },
};

export const useConfirm: UseConfirm = async (options) => {
  const preset = options.type ? confirmPresets[options.type] : undefined;
  const content = options.content ?? preset?.content ?? '';
  const successMessage = options.successMessage ?? preset?.successMessage;

  try {
    await ElMessageBox.confirm(content, options.title ?? '警告', {
      cancelButtonText: options.cancelText ?? '取消',
      confirmButtonText: options.confirmText ?? '确认',
      draggable: true,
      showCancelButton: options.showCancel ?? true,
      type: 'warning',
    });
  } catch {
    await options.onCancel?.();
    return 'cancel';
  }

  await options.onConfirm?.();

  if (successMessage) {
    useMessage.success(successMessage);
  }

  return 'confirm';
};
