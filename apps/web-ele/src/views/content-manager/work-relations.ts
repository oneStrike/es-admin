type RelationKey = 'author' | 'category' | 'tag';

type RelationEntity = {
  id?: null | number;
  name?: null | string;
};

type RelationItem = null | Record<string, unknown> | undefined;

function unwrapRelationItem(
  item: RelationItem,
  relationKey: RelationKey,
): null | RelationEntity {
  if (!item || typeof item !== 'object') {
    return null;
  }
  const nested = item[relationKey];
  const entity =
    nested && typeof nested === 'object'
      ? (nested as RelationEntity)
      : (item as RelationEntity);
  return entity;
}

export function extractRelationIds(
  list: null | RelationItem[] | undefined,
  relationKey: RelationKey,
): number[] {
  return (list ?? [])
    .map((item) => unwrapRelationItem(item, relationKey)?.id)
    .filter((id): id is number => typeof id === 'number');
}

export function extractRelationNames(
  list: null | RelationItem[] | undefined,
  relationKey: RelationKey,
): string[] {
  const names: string[] = [];
  for (const item of list ?? []) {
    const name = unwrapRelationItem(item, relationKey)?.name?.trim();
    if (name) {
      names.push(name);
    }
  }
  return names;
}
