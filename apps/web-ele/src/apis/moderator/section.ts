import type {
  SectionAssignRequest,
  SectionAssignResponse,
} from '../types/moderator/section.d';

import { requestClient } from '#/utils/request';

/**
 * 分配版主管理的板块
 */
export async function sectionAssignApi(
  params: SectionAssignRequest,
): Promise<SectionAssignResponse> {
  return requestClient.post<SectionAssignResponse>(
    '/api/forum/moderator/section/assign',
    params,
  );
}
