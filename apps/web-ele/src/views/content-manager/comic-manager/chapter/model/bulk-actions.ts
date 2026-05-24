export type ComicChapterBulkActionCommand = 'delete' | 'publish' | 'unpublish';

export type ComicChapterBulkActionRow = {
  id: number;
  isPublished: boolean;
};

export type ComicChapterBulkActionResult =
  | {
      ids: number[];
      isPublished: boolean;
      kind: 'publishStatus';
      successMessage: string;
    }
  | {
      ids: number[];
      kind: 'delete';
    }
  | {
      kind: 'warning';
      message: string;
    };

const BULK_ACTION_COMMANDS = new Set(['delete', 'publish', 'unpublish']);

export function isComicChapterBulkActionCommand(
  command: string,
): command is ComicChapterBulkActionCommand {
  return BULK_ACTION_COMMANDS.has(command);
}

export function getComicChapterBulkActionRows<
  T extends ComicChapterBulkActionRow,
>(rows: T[], command: ComicChapterBulkActionCommand) {
  if (command === 'delete') {
    return rows;
  }

  const targetPublished = command === 'unpublish';
  return rows.filter((item) => item.isPublished === targetPublished);
}

export function resolveComicChapterBulkAction<
  T extends ComicChapterBulkActionRow,
>(
  command: ComicChapterBulkActionCommand,
  selectedRows: T[],
): ComicChapterBulkActionResult {
  if (selectedRows.length === 0) {
    return {
      kind: 'warning',
      message: '请先选择章节',
    };
  }

  const rows = getComicChapterBulkActionRows(selectedRows, command);

  if (rows.length === 0) {
    return {
      kind: 'warning',
      message: command === 'publish' ? '请选择未发布章节' : '请选择已发布章节',
    };
  }

  const ids = rows.map((item) => item.id);

  if (command === 'delete') {
    return {
      ids,
      kind: 'delete',
    };
  }

  return {
    ids,
    isPublished: command === 'publish',
    kind: 'publishStatus',
    successMessage: command === 'publish' ? '批量发布成功' : '批量取消发布成功',
  };
}
