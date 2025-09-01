import { check } from 'k6';
import http from 'k6/http';

const username = __ENV.USERNAME;
const password = __ENV.PASSWORD;
const apiUrl = __ENV.API_URL;

if (!username || !password || !apiUrl) {
  throw new Error('Missing required environment variables');
}

export function createBooking(bookingData) {
  const url = `${apiUrl}/booking`;

  const payload = JSON.stringify({
    firstname: bookingData.firstname,
    lastname: bookingData.lastname,
    totalprice: bookingData.totalprice,
    depositpaid: bookingData.depositpaid,
    bookingdates: {
      checkin: bookingData.bookingdates.checkin,
      checkout: bookingData.bookingdates.checkout,
    },
    additionalneeds: bookingData.additionalneeds,
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: '30s'
  };

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
}
