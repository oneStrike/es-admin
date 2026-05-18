import type {
  ForumModeratorsAssignSectionRequest,
  ForumModeratorsCreateRequest,
  ForumModeratorsUpdateRequest,
} from '#/api/types';

export type ModeratorRoleType = 1 | 2 | 3;
export type ModeratorPermission = 1 | 2 | 3 | 4 | 5 | 6;

export const moderatorPermissionOptions: Array<{
  label: string;
  value: ModeratorPermission;
}> = [
  { label: '置顶', value: 1 },
  { label: '加精', value: 2 },
  { label: '锁定', value: 3 },
  { label: '删除', value: 4 },
  { label: '审核', value: 5 },
  { label: '移动', value: 6 },
];

const permissionValues = moderatorPermissionOptions.map((item) => item.value);

export class ModeratorPayloadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ModeratorPayloadValidationError';
  }
}

function toPositiveNumbers(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value.map(Number).filter((item) => Number.isInteger(item) && item > 0),
    ),
  ];
}

function toModeratorPermissions(value: unknown): ModeratorPermission[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalized = new Set<ModeratorPermission>();
  for (const item of value) {
    const permission = Number(item);
    if (
      Number.isInteger(permission) &&
      permissionValues.includes(permission as ModeratorPermission)
    ) {
      normalized.add(permission as ModeratorPermission);
    }
  }

  return permissionValues.filter((permission) => normalized.has(permission));
}

function toRoleType(value: unknown): ModeratorRoleType {
  const roleType = Number(value) as ModeratorRoleType;
  if (![1, 2, 3].includes(roleType)) {
    throw new ModeratorPayloadValidationError('请选择版主角色');
  }
  return roleType;
}

function toEnabled(value: unknown) {
  return value !== false;
}

function toOptionalText(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  return value.trim() || undefined;
}

function normalizeModeratorFields(values: Record<string, unknown>) {
  const roleType = toRoleType(values.roleType);
  const groupId = values.groupId ? Number(values.groupId) : undefined;
  const sectionIds = toPositiveNumbers(values.sectionIds);
  const permissions = toModeratorPermissions(values.permissions);
  const isEnabled = toEnabled(values.isEnabled);

  if (roleType === 2 && !groupId) {
    throw new ModeratorPayloadValidationError('分组版主需要选择所属分组');
  }

  if (roleType === 3 && sectionIds.length === 0) {
    throw new ModeratorPayloadValidationError(
      '板块版主至少需要选择一个管理板块',
    );
  }

  if (roleType !== 1 && isEnabled && permissions.length === 0) {
    throw new ModeratorPayloadValidationError(
      '启用的非超级版主至少需要选择一个权限',
    );
  }

  return {
    groupId: roleType === 2 ? groupId : undefined,
    isEnabled,
    permissions: permissions.length > 0 ? permissions : undefined,
    remark: toOptionalText(values.remark),
    roleType,
    sectionIds: roleType === 3 ? sectionIds : undefined,
  };
}

export function buildCreateModeratorPayload(values: Record<string, unknown>) {
  const selectedUserIds = toPositiveNumbers(values.selectedUserIds);

  if (selectedUserIds.length === 0) {
    throw new ModeratorPayloadValidationError('请选择一个用户');
  }

  return {
    ...normalizeModeratorFields(values),
    userId: selectedUserIds[0]!,
  } satisfies ForumModeratorsCreateRequest;
}

export function buildUpdateModeratorPayload(values: Record<string, unknown>) {
  const id = Number(values.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ModeratorPayloadValidationError('版主编号不合法');
  }

  return {
    ...normalizeModeratorFields(values),
    id,
  } satisfies ForumModeratorsUpdateRequest;
}

export function buildAssignModeratorSectionPayload(
  values: Record<string, unknown>,
  moderatorId: number,
) {
  const sectionIds = toPositiveNumbers(values.sectionIds);
  const permissions = toModeratorPermissions(values.permissions);

  if (sectionIds.length === 0) {
    throw new ModeratorPayloadValidationError('请至少选择一个板块');
  }

  return {
    moderatorId,
    ...(permissions.length > 0 ? { permissions } : {}),
    sectionIds,
  } satisfies ForumModeratorsAssignSectionRequest;
}
