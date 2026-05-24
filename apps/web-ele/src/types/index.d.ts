import type { VbenFormSchema as FormSchema } from '@vben/common-ui';

import type { ComponentType } from '#/adapter/component';

export type AsyncFn = <T = unknown>(
  ...args: unknown[]
) => Promise<T> | Promise<void>;

export type EsFormSchema = FormSchema<ComponentType>[];
