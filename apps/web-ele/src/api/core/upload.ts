import type { UploadFileUploadResponse } from '../types/upload.d';

import { requestClient } from '#/api/request';

/**
 * 上传文件
 */
export async function uploadFileUploadApi(): Promise<UploadFileUploadResponse> {
  return requestClient.post<UploadFileUploadResponse>(
    '/api/admin/upload/file/upload',
  );
}
