import type {
  AppUpdateReleaseDetailDto,
  AppUpdateReleaseListItemDto,
  CreateAppUpdateReleaseDto,
  UpdateAppUpdateReleaseDto,
  UploadResponseDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { UploadSceneEnum } from '#/enum/api';
import { formSchemaTransform, safeParseJson } from '#/utils';

export type AppUpdateFormValues = Partial<
  CreateAppUpdateReleaseDto & UpdateAppUpdateReleaseDto
> & {
  customPageUrl?: string;
  packageOriginalName?: null | string;
  packageUpload?: unknown;
  packageUrlUpload?: unknown;
  popupBackgroundImageUpload?: unknown;
};

// 发布平台配置
export const platformOptions = [
  {
    label: '安卓端',
    value: 2,
  },
  {
    label: '苹果端',
    value: 1,
  },
];

export const platformOptionsObj: Record<number, { label: string }> = {};
for (const item of platformOptions) {
  platformOptionsObj[item.value] = {
    label: item.label,
  };
}

// 是否强制更新
export const forceUpdateOptions = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

// 发布状态配置
export const publishedStatusOptions = [
  {
    label: '已发布',
    value: true,
  },
  {
    label: '未发布',
    value: false,
  },
];

// 安装包来源配置
export const packageSourceTypeOptions = [
  {
    label: '后台上传',
    value: 1,
  },
  {
    label: '外部下载地址',
    value: 2,
  },
  {
    label: '外部中转页',
    value: 3,
  },
];

// 更新弹窗背景图位置配置
export const popupBackgroundPositionOptions = [
  { label: '居中', value: 'center' },
  { label: '顶部居中', value: 'top center' },
  { label: '顶部靠左', value: 'top left' },
  { label: '顶部靠右', value: 'top right' },
  { label: '底部居中', value: 'bottom center' },
  { label: '底部靠左', value: 'bottom left' },
  { label: '底部靠右', value: 'bottom right' },
  { label: '左侧居中', value: 'left center' },
  { label: '右侧居中', value: 'right center' },
];

function normalizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

// 表单配置
export const formSchema: EsFormSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入展示版本号，如 1.2.0',
    },
    fieldName: 'versionName',
    label: '展示版本号',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入内部构建号',
      min: 1,
      controlsPosition: 'right',
      class: 'w-full',
    },
    fieldName: 'buildCode',
    label: '内部构建号',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择发布平台',
      options: platformOptions,
      class: 'w-full',
    },
    fieldName: 'platform',
    label: '发布平台',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      placeholder: '请选择是否强制更新',
      options: forceUpdateOptions,
      class: 'w-full',
    },
    defaultValue: false,
    fieldName: 'forceUpdate',
    label: '强制更新',
  },
  {
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      placeholder: '请选择安装包来源',
      options: packageSourceTypeOptions,
      class: 'w-full',
    },
    fieldName: 'packageSourceType',
    label: '安装包来源',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入安装包下载地址',
    },
    dependencies: {
      show: ({ packageSourceType }) => packageSourceType === 2,
      triggerFields: ['packageSourceType'],
    },
    fieldName: 'packageUrl',
    label: '下载地址',
    help: '用户点击更新后直接下载安装包的地址',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入中转页地址',
    },
    dependencies: {
      show: ({ packageSourceType }) => packageSourceType === 3,
      triggerFields: ['packageSourceType'],
    },
    fieldName: 'customPageUrl',
    label: '中转页地址',
    help: '用户点击更新后跳转到的中转页面地址',
  },
  {
    component: 'Upload',
    componentProps: {
      listType: 'text',
      accept: '.apk,.aab,.ipa,application/vnd.android.package-archive',
      placeholder: '请上传安装包文件',
      maxCount: 1,
      multiple: false,
      scene: UploadSceneEnum.APP_PACKAGE,
    },
    dependencies: {
      show: ({ packageSourceType }) => packageSourceType === 1,
      triggerFields: ['packageSourceType'],
    },
    fieldName: 'packageUpload',
    label: '上传安装包',
    help: '选择"后台上传"时使用，会自动带上文件地址、文件名、大小和 MIME 类型',
  },
  {
    component: 'Input',
    formItemClass: 'col-span-2',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入更新说明',
      rows: 4,
      maxlength: 2000,
      showWordLimit: true,
    },
    fieldName: 'releaseNotes',
    label: '更新说明',
  },
  {
    component: 'Upload',
    componentProps: {
      listType: 'picture-card',
      accept: '.jpg,.jpeg,.png,.webp,image/*',
      placeholder: '请上传更新弹窗背景图',
      maxCount: 1,
      multiple: false,
      scene: UploadSceneEnum.SHARED,
    },
    fieldName: 'popupBackgroundImageUpload',
    label: '弹窗背景图',
    help: '可选，用于自定义更新弹窗的背景图片',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择背景图位置',
      options: popupBackgroundPositionOptions,
      clearable: true,
      class: 'w-full',
    },
    fieldName: 'popupBackgroundPosition',
    label: '背景图位置',
    help: '背景图在弹窗中的显示位置，默认居中',
  },
];

// 表格列配置
export const appUpdateColumns =
  formSchemaTransform.toTableColumns<AppUpdateReleaseListItemDto>(formSchema, {
    packageSourceType: {
      hide: true,
    },
    packageUrl: {
      hide: true,
    },
    customPageUrl: {
      hide: true,
    },
    packageUpload: {
      hide: true,
    },
    releaseNotes: {
      hide: true,
    },
    popupBackgroundImageUpload: {
      hide: true,
    },
    popupBackgroundPosition: {
      hide: true,
    },
    buildCode: {
      title: '构建号',
    },
    versionName: {
      title: '版本号',
      slots: { default: 'versionName' },
    },
    forceUpdate: {
      title: '强制更新',
      cellRender: {
        name: 'CellTag',
      },
    },
    isPublished: {
      title: '发布状态',
      sort: 99,
      width: 120,
      slots: { default: 'isPublished' },
    },
    hasPackageUrl: {
      title: '安装包',
      sort: 98,
      width: 100,
      cellRender: {
        name: 'CellTag',
      },
    },
    publishedAt: {
      title: '发布时间',
      sort: 97,
      width: 160,
      slots: { default: 'publishedAt' },
    },
    actions: {
      show: true,
      width: 180,
    },
    createdAt: {
      hide: true,
    },
    updatedAt: {
      show: true,
    },
  });

// 搜索表单配置
export const appUpdateFilter = formSchemaTransform.toSearchSchema(formSchema, {
  versionName: {
    sort: 99,
  },
  platform: {
    sort: 98,
  },
  buildCode: {
    sort: 97,
  },
  forceUpdate: {
    sort: 96,
  },
  isPublished: {
    label: '',
    component: 'Select',
    componentProps: {
      placeholder: '发布状态',
      clearable: true,
      options: publishedStatusOptions,
    },
    sort: 95,
  },
});

/**
 * 根据安装包来源决定提交时的 packageUrl 值
 * - upload 模式：优先取上传组件的值，其次保留当前 packageUrl
 * - url 模式：取手动输入的值（packageUrl）
 */
export function resolvePackageUrl(
  values: Pick<
    AppUpdateFormValues,
    'packageSourceType' | 'packageUpload' | 'packageUrl' | 'packageUrlUpload'
  >,
): string | undefined {
  const directUrl = normalizeOptionalString(values.packageUrl);

  if (values.packageSourceType === 1) {
    const uploadedFile = normalizeUploadValue(
      values.packageUpload ?? values.packageUrlUpload,
    );
    return (
      normalizeOptionalString(uploadedFile?.filePath) ||
      normalizeOptionalString(values.packageUrlUpload) ||
      directUrl
    );
  }

  return directUrl;
}

function normalizeUploadValue(
  value: unknown,
): Partial<UploadResponseDto> | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return undefined;
    }

    const parsedValue = safeParseJson(trimmed);
    if (parsedValue) {
      return normalizeUploadValue(parsedValue);
    }

    return {
      filePath: trimmed,
    };
  }

  if (Array.isArray(value)) {
    return normalizeUploadValue(value[0]);
  }

  if (typeof value === 'object') {
    return value as Partial<UploadResponseDto>;
  }

  return undefined;
}
function createPackageUploadValue(detail: AppUpdateReleaseDetailDto) {
  if (detail.packageSourceType !== 1 || !detail.packageUrl) {
    return undefined;
  }

  const fallbackName =
    detail.packageOriginalName ||
    detail.packageUrl.split('/').pop() ||
    'package';
  const fallbackFileType = fallbackName.includes('.')
    ? fallbackName.split('.').pop() || ''
    : '';

  return {
    filePath: detail.packageUrl,
    fileSize: detail.packageFileSize ?? 0,
    fileType: fallbackFileType,
    filename: fallbackName,
    mimeType: detail.packageMimeType ?? '',
    originalName: detail.packageOriginalName ?? fallbackName,
    scene: UploadSceneEnum.SHARED,
    uploadTime: detail.updatedAt || detail.createdAt,
  } satisfies Partial<UploadResponseDto>;
}

function createPopupBackgroundImageUploadValue(
  detail: AppUpdateReleaseDetailDto,
) {
  if (!detail.popupBackgroundImage) {
    return undefined;
  }

  const fallbackName = detail.popupBackgroundImage.split('/').pop() || 'image';
  const fallbackFileType = fallbackName.includes('.')
    ? fallbackName.split('.').pop() || ''
    : '';

  return {
    filePath: detail.popupBackgroundImage,
    fileType: fallbackFileType,
    filename: fallbackName,
    originalName: fallbackName,
    scene: UploadSceneEnum.SHARED,
    uploadTime: detail.updatedAt || detail.createdAt,
  } satisfies Partial<UploadResponseDto>;
}

export function mapAppUpdateDetailToFormValues(
  detail: AppUpdateReleaseDetailDto,
): AppUpdateFormValues {
  // 根据安装包来源，将 packageUrl 映射到对应的表单字段
  let packageUrl: string | undefined;
  let customPageUrl: string | undefined;

  if (detail.packageSourceType === 2) {
    packageUrl = detail.packageUrl ?? undefined;
  } else if (detail.packageSourceType === 3) {
    customPageUrl = detail.packageUrl ?? undefined;
  }

  return {
    ...detail,
    packageUrl,
    customPageUrl,
    packageUpload: createPackageUploadValue(detail),
    popupBackgroundImageUpload: createPopupBackgroundImageUploadValue(detail),
  };
}

export function buildAppUpdateSubmitPayload(
  values: AppUpdateFormValues,
): CreateAppUpdateReleaseDto | UpdateAppUpdateReleaseDto {
  const uploadedFile = normalizeUploadValue(
    values.packageUpload ?? values.packageUrlUpload,
  );
  const popupBackgroundImageFile = normalizeUploadValue(
    values.popupBackgroundImageUpload,
  );

  const releaseNotes = normalizeOptionalString(values.releaseNotes);
  let packageUrl: string | undefined;
  let packageOriginalName: string | undefined;
  let packageFileSize: number | undefined;
  let packageMimeType: string | undefined;

  // 根据安装包来源处理 packageUrl
  switch (values.packageSourceType) {
    case 1: {
      // 后台上传
      packageUrl = resolvePackageUrl({
        packageUrl: values.packageUrl,
        packageSourceType: values.packageSourceType,
        packageUrlUpload: values.packageUrlUpload,
        packageUpload: uploadedFile,
      });
      packageOriginalName =
        normalizeOptionalString(uploadedFile?.originalName) ||
        normalizeOptionalString(uploadedFile?.filename) ||
        normalizeOptionalString(values.packageOriginalName);
      packageFileSize =
        uploadedFile?.fileSize ?? values.packageFileSize ?? undefined;
      packageMimeType =
        normalizeOptionalString(uploadedFile?.mimeType) ||
        normalizeOptionalString(values.packageMimeType);
      break;
    }
    case 2: {
      // 外部下载地址
      packageUrl = normalizeOptionalString(values.packageUrl);
      break;
    }
    case 3: {
      // 外部中转页
      packageUrl = normalizeOptionalString(values.customPageUrl);
      break;
    }
  }

  if (!packageUrl) {
    packageOriginalName = undefined;
    packageFileSize = undefined;
    packageMimeType = undefined;
  }

  // 处理弹窗背景图
  const popupBackgroundImage =
    normalizeOptionalString(popupBackgroundImageFile?.filePath) ||
    normalizeOptionalString(values.popupBackgroundImage);

  const payload = {
    versionName: values.versionName,
    buildCode: values.buildCode,
    platform: values.platform,
    forceUpdate: values.forceUpdate,
    packageSourceType: values.packageSourceType,
    packageUrl,
    packageOriginalName,
    packageFileSize,
    packageMimeType,
    releaseNotes,
    popupBackgroundImage,
    popupBackgroundPosition: normalizeOptionalString(
      values.popupBackgroundPosition,
    ),
  };

  return typeof values.id === 'number'
    ? ({ id: values.id, ...payload } as UpdateAppUpdateReleaseDto)
    : (payload as CreateAppUpdateReleaseDto);
}
