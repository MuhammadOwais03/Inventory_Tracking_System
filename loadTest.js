import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50, 
  duration: '30s',  
};

export default function () {
  
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZUlkIjoiZjAzOTVlYzgtZjI2MC00YzBjLTgwOGEtMzE4ZjM3MGU5ZjUyIiwiZW1haWwiOiJkb25hbGRzQGdtaWwuY29tIiwiaWF0IjoxNzQzMjUyNzA0LCJleHAiOjE3NDMzMzkxMDR9.e_kMrEb7znmTzZgHfyk8PdLKDFVX8ZMz716EZ8FyeE0";  

  const params = {
    headers: {
      'Authorization': `Bearer ${token}`,  
      'Cookie': `accessToken=${token}`, 
      'Content-Type': 'application/json',
    },
  };

  let res = http.get('http://localhost:5000/api/v2/logs/show-logs/f0395ec8-f260-4c0c-808a-318f370e9f52?startDate=2025-03-29&endDate=2025-03-29', params);

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Rate limit hit (429)': (r) => r.status === 429,
  });
  
  
  sleep(1);
}
