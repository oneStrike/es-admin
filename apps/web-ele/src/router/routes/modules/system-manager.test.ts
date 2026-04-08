import { describe, expect, it } from 'vitest';

import routes from './system-manager';

describe('system-manager routes', () => {
  it('registers ip geolocation manager under system manager', () => {
    const systemManagerRoute = routes.find(
      (route) => route.name === 'SystemManager',
    );
    const ipGeolocationRoute = systemManagerRoute?.children?.find(
      (route) => route.name === 'IpGeolocationManager',
    );

    expect(ipGeolocationRoute).toMatchObject({
      path: '/system-manager/ip-geolocation',
      meta: expect.objectContaining({
        title: 'IP 属地库',
      }),
    });
  });
});
