import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { verifyJWT } from '../../middlewares/verify-jwt'

export function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  // These routes is protected by the JWT
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
