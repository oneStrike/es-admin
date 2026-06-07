import type { LocalOption } from './types';

import { resolveExactRelationMatches } from './helpers';

export type RelationCandidateList = Array<{
  localCandidates: Array<{
    id: number;
    name: string;
  }>;
  providerName: string;
}>;

export function getRelationProviderNames(candidates: RelationCandidateList) {
  const names: string[] = [];
  const seenNames = new Set<string>();
  for (const item of candidates) {
    const name = item.providerName.trim();
    if (!name || seenNames.has(name)) {
      continue;
    }
    seenNames.add(name);
    names.push(name);
  }
  return names;
}

export function resolvePreviewRelationMatches(
  candidates: RelationCandidateList,
) {
  const sources = getRelationProviderNames(candidates).map((providerName) => {
    const candidate = candidates.find(
      (item) => item.providerName.trim() === providerName,
    );
    return {
      options: (candidate?.localCandidates ?? []).map(
        (item): LocalOption => ({
          label: item.name,
          value: item.id,
        }),
      ),
      providerName,
    };
  });

  return resolveExactRelationMatches(sources);
}
