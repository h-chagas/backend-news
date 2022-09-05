const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');


beforeEach( () => seed(testData));
afterAll( ()=> db.end());

describe('GET /api/topics', () => { 
    test('200: responds with an array of topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then( (response) => {
            expect(typeof response.body).toBe('object')
        })
    })
 })