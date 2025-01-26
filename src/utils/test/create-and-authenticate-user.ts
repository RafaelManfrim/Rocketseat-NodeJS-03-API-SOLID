import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'test',
      email: 'test@example.com',
      password_hash: await hash('testpassword', 6),
      role: isAdmin ? 'ADMIN' : 'USER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'test@example.com',
    password: 'testpassword',
  })

  const { token } = authResponse.body

  return { token }
}
