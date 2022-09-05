const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');


beforeEach( () => seed(testData));
afterAll( ()=> db.end());

describe('GET /api/topics', () => {
    test('404: responds with a message not found if a bad path is used', () => { 
        return request(app)
        .get('/api/oops')
        .expect(404)
        .then( (response) => {
            expect(response.body).toEqual({msg: 'route not found'})
        })
     })
    test('200: responds with an array of topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then( (response) => {
            expect(typeof response.body).toBe('object');
            expect(response.body.length > 0).toBe(true);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach( (topic) => {
                expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String),
                })
            })

        })
    })
 })