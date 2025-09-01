import { check } from 'k6';
import http from 'k6/http';

const username = __ENV.USERNAME;
const password = __ENV.PASSWORD;
const apiUrl = __ENV.API_URL;

if (!username || !password || !apiUrl) {
  throw new Error('Missing required environment variables');
}

export function getAuthToken() {
  const url = `${apiUrl}/auth`;

  const payload = JSON.stringify({ username, password });
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: '30s'
  };

  const res = http.post(url, payload, params);

  let token = null;
  check(res, {
    'login status was 200': (r) => r.status === 200,
    'body has token': (r) => {
      try {
        token = JSON.parse(r.body).token;
        return token !== undefined;
      } catch (e) {
        return false;
      }
    },
  });

  return token;
}
