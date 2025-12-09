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
    // 使用requestClient.upload方法处理文件上传，它会自动处理FormData和Content-Type
    const result = await requestClient.upload(
      api[apiType],
      {
        file,
        ...params,
      },
      {
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
      },
    );
    useMessage.success('上传成功');
    return result as UploadFileResItem;
  } catch (error) {
    return error;
  }
}
