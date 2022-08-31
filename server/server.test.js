const request = require('supertest');
const server = require('./server.js');

;

describe(" /reviews", () => {
  describe("get a review", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get('/reviews').send("Get Sucessfully!");
      expect(response.statusCode).toBe(200);
    })
  })
  describe("post a review ", () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(server).post('/reviews').send("Post Sucessfully!");
      expect(response.statusCode).toBe(201);
    })

  })
})