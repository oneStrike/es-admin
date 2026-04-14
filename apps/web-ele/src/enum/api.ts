// 上传文件场景
export enum UploadSceneEnum {
  APP_PACKAGE = 'app_package',
  SHARED = 'shared',
  WORK = 'work',
}

// 上传文件接口地址
export const UploadUrlMapEnum = {
  SHARED: '/api/admin/upload/file/upload',
  COMIC: '/api/admin/content/comic/chapter-content/upload',
  COMIC_ARCHIVE_PREVIEW:
    '/api/admin/content/comic/chapter-content/archive/preview',
};
