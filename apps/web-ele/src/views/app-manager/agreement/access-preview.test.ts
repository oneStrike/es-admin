import { describe, expect, it, vi } from 'vitest';

const { requestGet } = vi.hoisted(() => ({
  requestGet: vi.fn(),
}));

vi.mock('#/api/request', () => ({
  requestClient: {
    get: requestGet,
  },
}));

describe('agreement access preview helpers', () => {
  it('fetches the agreement access page as html text body', async () => {
    requestGet.mockResolvedValue('<html><body>协议</body></html>');

    const { fetchAgreementAccessHtml } = await import('./access-preview');

    await expect(fetchAgreementAccessHtml(12)).resolves.toBe(
      '<html><body>协议</body></html>',
    );

    expect(requestGet).toHaveBeenCalledWith('/api/admin/agreement/access', {
      params: { id: 12 },
      responseReturn: 'body',
      responseType: 'text',
    });
  });
});
