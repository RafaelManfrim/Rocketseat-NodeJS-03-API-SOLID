import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('if it registers a new user with valid inputs', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'test',
      email: 'test@example.com',
      password: 'testpassword',
    })

    expect(response.statusCode).toBe(201)
  })
})
