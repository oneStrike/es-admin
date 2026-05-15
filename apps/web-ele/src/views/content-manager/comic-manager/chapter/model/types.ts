import type { CreateWorkChapterDto, UpdateWorkChapterDto } from '#/api/types';

type ChapterSummary = {
  name?: null | string;
};

export type ComicChapterRecord = CreateWorkChapterDto &
  Pick<UpdateWorkChapterDto, 'id'> & {
    commentCount?: number;
    createdAt?: null | string;
    downloadCount?: number;
    isPublished: boolean;
    likeCount?: number;
    loading?: boolean;
    purchaseCount?: number;
    requiredViewLevel?: ChapterSummary | null;
    updatedAt?: null | string;
    viewCount?: number;
    work?: ChapterSummary | null;
    workType: 1;
  };
