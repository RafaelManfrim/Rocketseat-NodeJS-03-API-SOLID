import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('if the user can retrieve their profile successfully', async () => {
    await request(app.server).post('/users').send({
      name: 'test',
      email: 'test@example.com',
      password: 'testpassword',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'test@example.com',
      password: 'testpassword',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'test',
        email: 'test@example.com',
      }),
    )
  })
})
