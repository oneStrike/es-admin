import type { UploadUploadFileResponse } from '#/api/types';

import { requestClient } from '#/api/request';

import { useMessage } from './useFeedback';

type UploadFileResItem = UploadUploadFileResponse[number]; // UploadResponseDto

export async function useUpload(
  uploadUrl: string,
  file: File,
  params: Record<string, any> = {},
  onProgress?: (progressEvent: {
    loaded: number;
    percent: number;
    total: number;
  }) => void,
): Promise<unknown | UploadFileResItem> {
  try {
    const requestParams = [];
    for (const paramKey in params) {
      requestParams.push(`${paramKey}=${params[paramKey]}`);
    }
    // 使用requestClient.upload方法处理文件上传，它会自动处理FormData和Content-Type
    const result = await requestClient.upload(
      uploadUrl.includes('?')
        ? `${uploadUrl}&${requestParams.join('&')}`
        : `${uploadUrl}?${requestParams.join('&')}`,
      {
        ...params,
        file,
      },
      {
        timeout: 60_000,
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
