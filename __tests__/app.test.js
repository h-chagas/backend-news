const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
   test("404: responds with a message not found if a bad path is used", () => {
      return request(app)
         .get("/api/oops")
         .expect(404)
         .then((response) => {
            expect(response.body).toEqual({ msg: "route not found" });
         });
   });
   test("200: responds with an array of topics", () => {
      return request(app)
         .get("/api/topics")
         .expect(200)
         .then((response) => {
            expect(typeof response.body).toBe("object");
            expect(response.body.length > 0).toBe(true);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach((topic) => {
               expect(topic).toMatchObject({
                  slug: expect.any(String),
                  description: expect.any(String),
               });
            });
         });
   });
});
describe.only('GET /api/articles/:article_id', () => { 
    test('200: responds with an article object corresponded with article number passed', () => {
        const ARTICLE_ID = 1;
        return request(app)
        .get(`/api/articles/${ARTICLE_ID}`)
        .expect(200)
        .then((response) => {
            expect(typeof response.body).toBe('object')
            expect(response.body).toMatchObject({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
            })
        })
    })
    test('404: responds with a error message when article_id doesn\'t exist', () => {
        const ARTICLE_ID = 1000000;
        return request(app)
        .get(`/api/articles/${ARTICLE_ID}`)
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Article not found! Please try again')
        })
    })
    test.only('400: responds with a error message when client pass article_id which is not a number', () => {
        const ARTICLE_ID = 'banana';
        return request(app)
        .get(`/api/articles/${ARTICLE_ID}`)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Please type/select a number to choose an article')
        })
    })
 })
