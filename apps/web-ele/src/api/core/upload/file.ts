import type { FileUploadResponse } from '../../types/upload/file.d';

import { requestClient } from '#/api/request';

/**
 * 上传文件
 */
export async function fileUploadApi(
  params: FileUploadRequest,
): Promise<FileUploadResponse> {
  return requestClient.post<FileUploadResponse>(
    '/api/admin/upload/file/upload',
    params,
  );
}
