import type {
  ExperienceRecordPageRequest,
  ExperienceRecordPageResponse,
  RecordPageRequest,
  RecordPageResponse
} from '../../types/app-users/record.d'

import { requestClient } from '#/api/request'


  /**
   * 分页查询 APP 用户积分记录
   */
  export async function recordPageApi(params: RecordPageRequest): Promise<RecordPageResponse> {
    return requestClient.get<RecordPageResponse>('/api/admin/app-users/points/record/page', { params });
  }


  /**
   * 分页查询 APP 用户经验记录
   */
  export async function experienceRecordPageApi(params: ExperienceRecordPageRequest): Promise<ExperienceRecordPageResponse> {
    return requestClient.get<ExperienceRecordPageResponse>('/api/admin/app-users/experience/record/page', { params });
  }
