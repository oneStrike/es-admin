import { describe, expect, it } from 'vitest';

import { resolvePreviewRelationMatches } from './relation-candidates';

describe('third-party comic relation candidates', () => {
  it('selects exact backend local candidates and ignores non-matches', () => {
    expect(
      resolvePreviewRelationMatches([
        {
          providerName: 'DUBU',
          localCandidates: [
            { id: 1, name: 'DUBU' },
            { id: 2, name: 'DUBU Studio' },
          ],
        },
        {
          providerName: 'REDICE',
          localCandidates: [{ id: 3, name: 'REDICE STUDIO' }],
        },
      ]),
    ).toEqual([{ label: 'DUBU', value: 1 }]);
  });

  it('deduplicates provider names and tolerates empty local candidates', () => {
    expect(
      resolvePreviewRelationMatches([
        {
          providerName: ' DUBU ',
          localCandidates: [{ id: 1, name: 'DUBU' }],
        },
        {
          providerName: 'DUBU',
          localCandidates: [{ id: 2, name: 'DUBU' }],
        },
        {
          providerName: '  ',
          localCandidates: [{ id: 3, name: 'ignored' }],
        },
        {
          providerName: 'No Match',
          localCandidates: [],
        },
      ]),
    ).toEqual([{ label: 'DUBU', value: 1 }]);
  });
});
