import { requestClient } from '#/api/request';

export async function fetchAgreementAccessHtml(id: number): Promise<string> {
  // The generated wrapper models this HTML access page as a JSON API response.
  return requestClient.get<string>('/api/admin/agreement/access', {
    params: { id },
    responseReturn: 'body',
    responseType: 'text',
  });
}
