import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('if it fetches a nearby gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test-gym',
        description: 'test-gym-description',
        phone: '123456789',
        latitude: 10,
        longitude: 50,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test-gym-2',
        description: 'test-gym-2-description',
        phone: '123456789',
        latitude: 30,
        longitude: 60,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 30,
        longitude: 60,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
  })
})
