import app from '../app.js'
import request from 'supertest'

describe('GET /recipes', () => {

    test('should respond with a 200 status code ', async () => {

        const response = await request(app).get('/recipes').send()
        expect(response.status).toBe(200)

    })

    test('should respond with an array ', async () => {
        const response = await request(app).get('/recipes').send()
        expect(response.body).toEqual(expect.arrayContaining([]))
        expect(response.body).toBeInstanceOf(Array)
    })
})

