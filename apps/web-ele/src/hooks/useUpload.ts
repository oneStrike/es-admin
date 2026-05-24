import type { UploadFileUploadResponse } from '#/api/types';

import { requestClient } from '#/api/request';

import { useMessage } from './useFeedback';

export async function useUpload(
  uploadUrl: string,
  file: File,
  params: Record<string, unknown> = {},
  onProgress?: (progressEvent: {
    loaded: number;
    percent: number;
    total: number;
  }) => void,
): Promise<unknown | UploadFileUploadResponse> {
  try {
    const searchParams = new URLSearchParams();
    for (const [paramKey, paramValue] of Object.entries(params)) {
      if (paramValue !== undefined && paramValue !== null) {
        searchParams.append(paramKey, String(paramValue));
      }
    }
    const queryString = searchParams.toString();
    const separator = uploadUrl.includes('?') ? '&' : '?';
    const requestUrl = queryString
      ? `${uploadUrl}${separator}${queryString}`
      : uploadUrl;

    const result = await requestClient.upload(
      requestUrl,
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
    return result as UploadFileUploadResponse;
  } catch (error) {
    return error;
  }
}
