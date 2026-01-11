import type { AsyncFn } from '#/types';

import { ElMessage, ElMessageBox } from 'element-plus';

export const useMessage: typeof ElMessage = ElMessage;

export type UseConfirm = (
  type: 'clear' | 'delete' | 'disable' | 'enable' | 'reset' | 'restore',
  handler?: AsyncFn,
  callback?: () => void,
) => Promise<boolean>;

export const useConfirm: UseConfirm = async (type, handler, callback) => {
  return new Promise<boolean>((resolve) => {
    let message = '';
    let prompt = '';
    switch (type) {
      case 'clear': {
        message = '是否清空当前数据？注意清空后无法恢复！！！';
        prompt = '清空成功';
        break;
      }
      case 'delete': {
        message = '是否删除当前数据？';
        prompt = '删除成功';
        break;
      }
      case 'disable': {
        message = '是否禁用当前数据？';
        prompt = '禁用成功';
        break;
      }
      case 'enable': {
        message = '是否启用当前数据？';
        prompt = '启用成功';
        break;
      }
      case 'reset': {
        message = '是否重置当前数据？';
        prompt = '重置成功';
        break;
      }
      case 'restore': {
        message = '是否恢复当前数据？';
        prompt = '恢复成功';
        break;
      }
    }

    ElMessageBox.confirm(message, '警告', {
      type: 'warning',
      draggable: true,
    })
      .then(async () => {
        handler && (await handler());
        useMessage.success(prompt);
        if (callback) {
          callback();
        }
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};
