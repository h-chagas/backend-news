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
         .get("/api/i-am-not-a-topic")
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
describe('GET /api/articles/:article_id', () => { 
    test('200: responds with an article object corresponded with article number passed', () => {
        const ARTICLE_ID = 1;
        return request(app)
        .get(`/api/articles/${ARTICLE_ID}`)
        .expect(200)
        .then((response) => {
            expect(typeof response.body).toBe('object')
            expect(response.body).toMatchObject({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: '2020-07-09T20:11:00.000Z',
                votes: 100,
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
    test('400: responds with a error message when client pass article_id which is not a number', () => {
        const ARTICLE_ID = 'banana';
        return request(app)
        .get(`/api/articles/${ARTICLE_ID}`)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Please type/select a number to choose an article')
        })
    })
});

describe('GET /api/users', () => { 
   test('200: responds with an array of users', () => { 
    return request(app)
    .get('/api/users')
    .expect(200)
    .then((response) => {
        expect(typeof response.body).toBe('object')
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length > 0).toBe(true)
        response.body.forEach((user) => {
            expect(user).toMatchObject({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
            })
        })
    })
    });
    test("404: responds with a message not found if a bad path is used", () => {
        return request(app)
           .get("/api/i-am-not-a-user")
           .expect(404)
           .then((response) => {
              expect(response.body).toEqual({ msg: "route not found" });
           });
     });
 })
