import { describe, expect, it } from 'vitest';

import { resolveExactRelationMatches } from './helpers';

describe('third-party relation auto matching', () => {
  it('selects every exact full-name match from searched options', () => {
    expect(
      resolveExactRelationMatches([
        {
          options: [
            { label: '夏达', value: 1 },
            { label: '夏达', value: 2 },
            { label: '夏达作品', value: 3 },
          ],
          providerName: ' 夏达 ',
        },
        {
          options: [{ label: '冒险', value: 4 }],
          providerName: '冒险',
        },
      ]),
    ).toEqual([
      { label: '夏达', value: 1 },
      { label: '夏达', value: 2 },
      { label: '冒险', value: 4 },
    ]);
  });

  it('does not select partial matches', () => {
    expect(
      resolveExactRelationMatches([
        {
          options: [
            { label: '热血冒险', value: 1 },
            { label: '冒险', value: 2 },
            { label: '冒险中', value: 3 },
          ],
          providerName: '冒险',
        },
      ]),
    ).toEqual([{ label: '冒险', value: 2 }]);
  });

  it('deduplicates repeated exact matches by option value', () => {
    expect(
      resolveExactRelationMatches([
        {
          options: [
            { label: '奇幻', value: 1 },
            { label: '奇幻', value: 2 },
          ],
          providerName: '奇幻',
        },
        {
          options: [
            { label: '奇幻', value: 1 },
            { label: '奇幻', value: 3 },
          ],
          providerName: '奇幻',
        },
      ]),
    ).toEqual([
      { label: '奇幻', value: 1 },
      { label: '奇幻', value: 2 },
      { label: '奇幻', value: 3 },
    ]);
  });
});
