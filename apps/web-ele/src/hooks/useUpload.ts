import type { UploadUploadFileResponse } from '#/apis/types/upload';

import { requestClient } from '#/utils/request';

import { useMessage } from './useFeedback';

type UploadFileResItem = UploadUploadFileResponse[number]; // UploadResponseDto

const api = {
  common: '/api/admin/upload/upload-file',
  comic: '/admin/comic/chapter/create',
};

export async function useUpload(
  file: File,
  params: Record<string, any> = {},
  apiType: keyof typeof api = 'common',
  onProgress?: (progressEvent: {
    loaded: number;
    percent: number;
    total: number;
  }) => void,
): Promise<unknown | UploadFileResItem> {
  try {
    const formData = new FormData();

    // 添加额外参数
    for (const paramsKey in params) {
      formData.append(paramsKey, params[paramsKey]);
    }

    formData.append('file', file);
    const result = await requestClient.post(api[apiType], formData, {
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress({
            percent,
            loaded: progressEvent.loaded,
            total: progressEvent.total,
          });
        }
      },
    });
    useMessage.success('上传成功');
    return result as UploadFileResItem;
  } catch (error) {
    return error;
  }
}
