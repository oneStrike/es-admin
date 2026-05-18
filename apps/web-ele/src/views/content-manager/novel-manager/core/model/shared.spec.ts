import { describe, expect, it } from 'vitest';

import { formSchema } from './shared';

describe('novel manager form schema', () => {
  it('requires tags like the comic manager form does', () => {
    const tagField = formSchema.find((item) => item.fieldName === 'tagIds');

    expect(tagField).toMatchObject({
      fieldName: 'tagIds',
      rules: 'arrayRequired',
    });
  });
});
