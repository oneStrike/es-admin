import type {
  AppUpdateReleaseDetailDto,
  AppUpdateReleaseListItemDto,
  UploadResponseDto,
} from '#/api/types';
import type { EsFormSchema } from '#/types';

import { UploadSceneEnum } from '#/enum/api';
import { formSchemaTransform, safeParseJson } from '#/utils';

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
    component: 'Input',
    componentProps: {
      placeholder: '请输入自定义下载页地址',
    },
    fieldName: 'customDownloadUrl',
    label: '自定义下载页地址',
    help: '可选，用户点击"立即更新"时跳转的页面地址',
  },
  {
    component: 'RadioGroup',
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
      placeholder: '请输入安装包地址（外部下载地址时填写）',
    },
    dependencies: {
      show: ({ packageSourceType }) => packageSourceType === 2,
      triggerFields: ['packageSourceType'],
    },
    fieldName: 'packageUrl',
    label: '安装包地址',
    help: '选择"外部下载地址"时需手动输入，选择"后台上传"后自动填充',
  },
  {
    component: 'Upload',
    componentProps: {
      accept: '.apk,.aab,.ipa,application/vnd.android.package-archive',
      listType: 'text',
      placeholder: '请上传安装包文件',
      maxCount: 1,
      multiple: false,
      scene: UploadSceneEnum.SHARED,
      returnDataType: 'json',
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
];

// 表格列配置
export const appUpdateColumns =
  formSchemaTransform.toTableColumns<AppUpdateReleaseListItemDto>(
    formSchema,
    {
      customDownloadUrl: {
        hide: true,
      },
      packageSourceType: {
        hide: true,
      },
      packageUrl: {
        hide: true,
      },
      packageUpload: {
        hide: true,
      },
      releaseNotes: {
        hide: true,
      },
      buildCode: {
        title: '构建号',
      },
      versionName: {
        title: '版本号',
        slots: { default: 'versionName' },
      },
      platform: {
        title: '平台',
        cellRender: {
          name: 'CellTag',
          props: {
            mapOptions: platformOptions,
          },
        },
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
      hasCustomDownloadUrl: {
        title: '自定义下载页',
        sort: 98,
        width: 120,
        cellRender: {
          name: 'CellTag',
        },
      },
      hasPackageUrl: {
        title: '安装包',
        sort: 97,
        width: 100,
        cellRender: {
          name: 'CellTag',
        },
      },
      publishedAt: {
        title: '发布时间',
        sort: 96,
        width: 160,
        slots: { default: 'publishedAt' },
      },
      actions: {
        show: true,
        width: 260,
      },
      createdAt: {
        hide: true,
      },
      updatedAt: {
        show: true,
      },
    },
  );

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
export function resolvePackageUrl(values: Record<string, any>): string | undefined {
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
    detail.packageOriginalName || detail.packageUrl.split('/').pop() || 'package';
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

export function mapAppUpdateDetailToFormValues(
  detail: AppUpdateReleaseDetailDto,
): Record<string, any> {
  return {
    ...detail,
    packageUpload: createPackageUploadValue(detail),
  };
}

export function buildAppUpdateSubmitPayload(
  values: Record<string, any>,
): Record<string, any> {
  const payload = { ...values };
  const uploadedFile = normalizeUploadValue(
    payload.packageUpload ?? payload.packageUrlUpload,
  );

  payload.customDownloadUrl = normalizeOptionalString(payload.customDownloadUrl);
  payload.releaseNotes = normalizeOptionalString(payload.releaseNotes);
  if (payload.packageSourceType === 1) {
    payload.packageUrl = resolvePackageUrl({
      ...payload,
      packageUpload: uploadedFile,
    });
    payload.packageOriginalName =
      normalizeOptionalString(uploadedFile?.originalName) ||
      normalizeOptionalString(uploadedFile?.filename) ||
      normalizeOptionalString(payload.packageOriginalName);
    payload.packageFileSize =
      uploadedFile?.fileSize ?? payload.packageFileSize ?? undefined;
    payload.packageMimeType =
      normalizeOptionalString(uploadedFile?.mimeType) ||
      normalizeOptionalString(payload.packageMimeType);
  } else {
    payload.packageUrl = resolvePackageUrl(payload);
    payload.packageOriginalName = undefined;
    payload.packageFileSize = undefined;
    payload.packageMimeType = undefined;
  }

  if (!payload.packageUrl) {
    payload.packageOriginalName = undefined;
    payload.packageFileSize = undefined;
    payload.packageMimeType = undefined;
  }

  delete payload.packageUpload;
  delete payload.packageUrlUpload;
  delete payload._storeLinksDivider;
  return payload;
}
