import { requestClient } from '#/utils/request'
import type {
  UploadUploadFileResponse,
  UploadResponseDto
} from './types/upload.d'


  /**
   * 上传文件
   */
  export async function uploadUploadFileApi(): Promise<UploadUploadFileResponse> {
    return requestClient.post<UploadUploadFileResponse>('/api/admin/upload/upload-file');
  }
