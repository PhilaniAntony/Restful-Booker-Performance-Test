import { check, sleep } from 'k6';
import http from 'k6/http';

const apiUrl = __ENV.API_URL;

if (!apiUrl) {
  throw new Error('Missing required environment variables');
}

const testData = JSON.parse(open('../data/bookingData.json'));
const newBooking = testData.newBooking;

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
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: '30s'
  };
  
  const payload = JSON.stringify({
    firstname: newBooking.firstname,
    lastname: newBooking.lastname,
    totalprice: newBooking.totalprice,
    depositpaid: newBooking.depositpaid,
    bookingdates: {
      checkin: newBooking.bookingdates.checkin,
      checkout: newBooking.bookingdates.checkout,
    },
    additionalneeds: newBooking.additionalneeds,
  });

  const res = http.post(url, payload, params);

  check(res, {
      'create booking status was 200': (r) => r.status === 200,
      'body has bookingid': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.bookingid !== undefined;
        } catch (e) {
          return false;
        }
      },
      'response time < 500ms': (r) => r.timings.duration < 500,
    });

  sleep(0.1);
}