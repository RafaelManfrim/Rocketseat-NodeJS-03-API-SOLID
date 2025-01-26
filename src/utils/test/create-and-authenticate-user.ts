import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  return { token }
}
