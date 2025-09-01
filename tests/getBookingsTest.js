import { check, sleep } from 'k6';
import http from 'k6/http';

const apiUrl = __ENV.API_URL;

if (!apiUrl) {
  throw new Error('Missing required environment variables');
}

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
  const url = `${apiUrl}/booking`;
  const res = http.get(url);

  check(res, { 
    'status was 200': (r) => r.status == 200,
    'body is not empty': (r) => r.body.length > 0
  });
  
  sleep(0.1);
}