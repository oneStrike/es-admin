import type { UploadUploadFileResponse } from '../../types/upload/upload.d';

import { requestClient } from '#/api/request';

/**
 * 上传文件
 */
export async function uploadUploadFileApi(): Promise<UploadUploadFileResponse> {
  return requestClient.post<UploadUploadFileResponse>(
    '/api/admin/upload/upload-file',
  );
}
