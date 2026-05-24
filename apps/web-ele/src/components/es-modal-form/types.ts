import type { VbenFormProps } from '@vben/common-ui';

import type { EsFormSchema } from '#/types';

export type EsModalFormValues = Record<string, unknown>;

export interface EsModalFormProps {
  cols?: number;
  title?: string;
  width?: number;
  record?: EsModalFormValues;
  /** Form schema from props or modal shared data. */
  schema?: EsFormSchema;
  bitMaskField?: string[];
  fieldMappingTime?: VbenFormProps['fieldMappingTime'];
  onSubmit?: (values: EsModalFormValues) => Promise<void> | void;
}
