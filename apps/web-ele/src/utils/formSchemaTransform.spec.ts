import { describe, expect, it } from 'vitest';

import type { EsFormSchema } from '#/types';

import { formSchemaTransform } from './formSchemaTransform';

describe('formSchemaTransform', () => {
  it('does not add a default formatter to slot columns', () => {
    const schema: EsFormSchema = [
      { component: 'Input', fieldName: 'name', label: '名称' },
      { component: 'Input', fieldName: 'status', label: '状态' },
    ];

    const columns = formSchemaTransform.toTableColumns(schema, {
      status: { slots: { default: 'status' } },
    });

    const nameColumn = columns.find((item) => item.field === 'name');
    const statusColumn = columns.find((item) => item.field === 'status');

    expect(nameColumn?.formatter).toBeTypeOf('function');
    expect(statusColumn).not.toHaveProperty('formatter');
  });
});
