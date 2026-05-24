import type {
  VbenFormProps as FormProps,
  VbenFormSchema as FormSchema,
} from '@vben/common-ui';

import type { ComponentPropsMap, ComponentType } from './component';

import { setupVbenForm, useVbenForm as useForm, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

type RuleContext = {
  label?: string;
};

function getRuleLabel(ctx: unknown) {
  return typeof ctx === 'object' && ctx !== null && 'label' in ctx
    ? String((ctx as RuleContext).label ?? '')
    : '';
}

function hasUploadFileValue(value: unknown): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const file = value as Record<string, unknown>;
  return Boolean(
    file.url ||
    (typeof file.response === 'object' &&
      file.response !== null &&
      (file.response as Record<string, unknown>).url) ||
    file.name ||
    file.uid,
  );
}

function isEmptyRequiredValue(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.length === 0) ||
    (Array.isArray(value) && value.length === 0)
  );
}

async function initSetupVbenForm() {
  setupVbenForm<ComponentType>({
    config: {
      modelPropNameMap: {
        Upload: 'fileList',
        CheckboxGroup: 'model-value',
      },
    },
    defineRules: {
      required: (value: unknown, _params: unknown, ctx: unknown) => {
        if (isEmptyRequiredValue(value)) {
          return $t('ui.formRules.required', [getRuleLabel(ctx)]);
        }
        return true;
      },
      selectRequired: (value: unknown, _params: unknown, ctx: unknown) => {
        if (isEmptyRequiredValue(value)) {
          return $t('ui.formRules.selectRequired', [getRuleLabel(ctx)]);
        }
        return true;
      },
      arrayRequired: (value: unknown, _params: unknown, ctx: unknown) => {
        if (
          value === undefined ||
          value === null ||
          !Array.isArray(value) ||
          value.length === 0
        ) {
          return $t('ui.formRules.arrayRequired', [getRuleLabel(ctx)]);
        }
        return true;
      },
      uploadRequired: (value: unknown, _params: unknown, ctx: unknown) => {
        // 处理上传组件的值，可能是数组、对象或字符串
        if (value === undefined || value === null) {
          return $t('ui.formRules.uploadRequired', [getRuleLabel(ctx)]);
        }

        // 如果是数组（文件列表），检查是否为空
        if (Array.isArray(value)) {
          if (value.length === 0) {
            return $t('ui.formRules.uploadRequired', [getRuleLabel(ctx)]);
          }
          // 检查数组中是否有有效的文件项
          const hasValidFile = value.some((item) => hasUploadFileValue(item));
          if (!hasValidFile) {
            return $t('ui.formRules.uploadRequired', [getRuleLabel(ctx)]);
          }
        } else if (typeof value === 'object') {
          // 如果是对象，检查是否有有效属性
          if (!hasUploadFileValue(value)) {
            return $t('ui.formRules.uploadRequired', [getRuleLabel(ctx)]);
          }
        } else if (
          typeof value === 'string' && // 如果是字符串（URL），检查是否为空
          value.trim() === ''
        ) {
          return $t('ui.formRules.uploadRequired', [getRuleLabel(ctx)]);
        }

        return true;
      },
    },
  });
}

const useVbenForm = useForm<ComponentType, ComponentPropsMap>;

export { initSetupVbenForm, useVbenForm, z };

export type VbenFormSchema = FormSchema<ComponentType, ComponentPropsMap>;
export type VbenFormProps = FormProps<ComponentType, ComponentPropsMap>;
