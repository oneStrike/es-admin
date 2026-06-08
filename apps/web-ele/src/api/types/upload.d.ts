export type UploadFileUploadResponse = UploadResponseDto;

/**
 *  类型定义 [UploadResponseDto]
 *  @来源 components.schemas
 *  @更新时间 2026-05-09 22:20:06
 */
export type UploadResponseDto = {
  /* 文件分类 */
  fileCategory: string;
  /* 文件名 */
  filename: string;
  /* 文件路径 */
  filePath: string;
  /* 文件大小 */
  fileSize: number;
  /* 文件扩展名 */
  fileType: string;
  /* 图片高度 */
  height?: null | number;
  /* 文件 MIME 类型 */
  mimeType: string;
  /* 原始文件名 */
  originalName: string;
  /* 文件场景 */
  scene: string;
  /* 上传时间 */
  uploadTime: string;
  /* 图片宽度 */
  width?: null | number;
};
