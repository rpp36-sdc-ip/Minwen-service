import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRates = new Rate('errors');



export const options = {
  vus: 700, //vus: a number of virtual users calling our API at the same time (1 is the default value),
  duration: '1m',// duration: how long we want our test to run.
};

export default function () {
  // const url = 'http://localhost:3002/reviews/';
  // check(http.get(`${url}?product_id=1000010`), {
  //   'status is 200': (r) => r.status == 200,
  // }) || errorRates.add(1);

  // const url = 'http://localhost:3002/reviews/meta';
  // check(http.get(`${url}?product_id=1000010`), {
  //   'status is 200': (r) => r.status == 200,
  // }) || errorRates.add(1);

  // const url = 'http://localhost:3002/reviews/';
  // check(http.put(`${url}5774939/report`), {
  //   'status is 204': (r) => r.status == 204,
  // }) || errorRates.add(1);

  // const url = 'http://localhost:3002/reviews/';
  // check(http.put(`${url}5774939/helpful`), {
  //   'status is 204': (r) => r.status == 204,
  // }) || errorRates.add(1);


  const body = {
    product_id: 1000010,
    rating: 4,
    summary: 'best ever',
    body: 'best everbest everbest everbest everbest everbest everbest everbest everbest ever',
    recommend: true,
    name: 'jack',
    email: 'jackson@gmail.com',
    photos: [],

  };

  const url = 'http://localhost:3002/reviews';
  check(http.post(`${url}`, body), {
    'status is 201': (r) => r.status == 201,
  }) || errorRates.add(1);

};

