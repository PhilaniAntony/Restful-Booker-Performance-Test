import { check, sleep } from 'k6';
import { getAuthToken } from '../helpers/auth.js';

export const options = {
  vus: 500,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
    checks: ['rate>0.95']
  },
};

export default function () {
  let token = getAuthToken();
  check(token, {
    'Token length is greater than 0': () => token.length > 0,
  });

  sleep(0.1);
}
