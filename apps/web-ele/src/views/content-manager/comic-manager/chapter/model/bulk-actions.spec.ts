import { describe, expect, it } from 'vitest';

import {
  getComicChapterBulkActionRows,
  isComicChapterBulkActionCommand,
  resolveComicChapterBulkAction,
} from './bulk-actions';

const selectedRows = [
  { id: 1, isPublished: false },
  { id: 2, isPublished: true },
  { id: 3, isPublished: false },
];

describe('comic chapter bulk actions', () => {
  it('accepts only supported bulk action commands', () => {
    expect(isComicChapterBulkActionCommand('delete')).toBe(true);
    expect(isComicChapterBulkActionCommand('publish')).toBe(true);
    expect(isComicChapterBulkActionCommand('unpublish')).toBe(true);
    expect(isComicChapterBulkActionCommand('toggle')).toBe(false);
  });

  it('warns before executing when no chapter is selected', () => {
    expect(resolveComicChapterBulkAction('delete', [])).toEqual({
      kind: 'warning',
      message: '请先选择章节',
    });
    expect(resolveComicChapterBulkAction('publish', [])).toEqual({
      kind: 'warning',
      message: '请先选择章节',
    });
  });

  it('keeps every selected chapter for batch delete', () => {
    expect(getComicChapterBulkActionRows(selectedRows, 'delete')).toEqual(
      selectedRows,
    );
    expect(resolveComicChapterBulkAction('delete', selectedRows)).toEqual({
      ids: [1, 2, 3],
      kind: 'delete',
    });
  });

  it('publishes only selected unpublished chapters', () => {
    expect(resolveComicChapterBulkAction('publish', selectedRows)).toEqual({
      ids: [1, 3],
      isPublished: true,
      kind: 'publishStatus',
      successMessage: '批量发布成功',
    });
    expect(
      resolveComicChapterBulkAction('publish', [{ id: 2, isPublished: true }]),
    ).toEqual({
      kind: 'warning',
      message: '请选择未发布章节',
    });
  });

  it('unpublishes only selected published chapters', () => {
    expect(resolveComicChapterBulkAction('unpublish', selectedRows)).toEqual({
      ids: [2],
      isPublished: false,
      kind: 'publishStatus',
      successMessage: '批量取消发布成功',
    });
    expect(
      resolveComicChapterBulkAction('unpublish', [
        { id: 1, isPublished: false },
      ]),
    ).toEqual({
      kind: 'warning',
      message: '请选择已发布章节',
    });
  });
});
