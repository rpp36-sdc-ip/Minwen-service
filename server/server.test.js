const request = require('supertest');
const server = require('./server.js');



describe(" /reviews", () => {
  describe("get review list ", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get('/reviews').send("Get Sucessfully!");
      expect(response.statusCode).toBe(200);
    })
  })

  describe("get review meta ", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get('/reviews/meta').send("Get Meta Sucessfully!");
      expect(response.statusCode).toBe(200);
    })
  })

  describe("post a review ", () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(server).post('/reviews').send("Post Sucessfully!");
      expect(response.statusCode).toBe(201);
    })

  })

  describe("put review's report", () => {
    test("should respond with a 204 status code", async () => {
      const response = await request(server).put('/reviews/report').send("put report Sucessfully");
      expect(response.statusCode).toBe(204);
    })

  })

  describe("put a review helpful", () => {
    test("should respond with a 204 status code", async () => {
      const response = await request(server).put('/reviews/helpful').send("put helpful Sucessfully");
      expect(response.statusCode).toBe(204);
    })

  })

  describe("post a review ", () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(server).post('/reviews').send("Post Sucessfully!");
      expect(response.statusCode).toBe(201);
    })

  })

})