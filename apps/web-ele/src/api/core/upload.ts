import type {
  UploadFileUploadRequest,
  UploadFileUploadResponse,
} from '../types/upload.d';

import { requestClient } from '#/api/request';

/**
 * 上传文件
 */
export async function uploadFileUploadApi(
  params?: UploadFileUploadRequest,
): Promise<UploadFileUploadResponse> {
  return requestClient.post<UploadFileUploadResponse>(
    '/api/admin/upload/file/upload',
    undefined,
    { params },
  );
}
