import { describe, expect, it } from 'vitest';

import {
  ModeratorPayloadValidationError,
  buildAssignModeratorSectionPayload,
  buildCreateModeratorPayload,
  buildUpdateModeratorPayload,
} from './payload';

describe('forum moderator payload helpers', () => {
  it('builds a whitelisted create payload with base permissions', () => {
    expect(
      buildCreateModeratorPayload({
        extraUiState: 'ignored',
        groupId: 2,
        isEnabled: true,
        permissions: [6, 1, 1, undefined, 999],
        remark: '  lead moderator  ',
        roleType: 2,
        selectedUserIds: [7],
        sectionIds: [10],
      }),
    ).toEqual({
      groupId: 2,
      isEnabled: true,
      permissions: [1, 6],
      remark: 'lead moderator',
      roleType: 2,
      userId: 7,
    });
  });

  it('rejects enabled non-super moderators without base permissions', () => {
    expect(() =>
      buildCreateModeratorPayload({
        groupId: 2,
        isEnabled: true,
        permissions: [],
        roleType: 2,
        selectedUserIds: [7],
      }),
    ).toThrow(ModeratorPayloadValidationError);
  });

  it('allows super moderators to omit base permissions', () => {
    expect(
      buildUpdateModeratorPayload({
        id: 5,
        isEnabled: true,
        permissions: [],
        roleType: 1,
      }),
    ).toEqual({
      id: 5,
      isEnabled: true,
      roleType: 1,
    });
  });

  it('keeps assign-section permissions optional so empty means inherit base permissions', () => {
    expect(
      buildAssignModeratorSectionPayload(
        {
          permissions: [],
          sectionIds: [10, '11', 0],
        },
        5,
      ),
    ).toEqual({
      moderatorId: 5,
      sectionIds: [10, 11],
    });
  });

  it('adds custom assign-section permissions only when selected', () => {
    expect(
      buildAssignModeratorSectionPayload(
        {
          permissions: [4, 5],
          sectionIds: [10],
        },
        5,
      ),
    ).toEqual({
      moderatorId: 5,
      permissions: [4, 5],
      sectionIds: [10],
    });
  });
});
