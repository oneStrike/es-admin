import type { AuditPageRequest, AuditPageResponse } from '../types/audit.d';

import { requestClient } from '#/api/request';

/**
 * 获取审计日志列表
 */
export async function auditPageApi(
  params?: AuditPageRequest,
): Promise<AuditPageResponse> {
  return requestClient.get<AuditPageResponse>('/api/admin/audit/page', {
    params,
  });
}
