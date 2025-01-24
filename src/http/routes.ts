import { FastifyInstance } from 'fastify'

import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'

export function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // These routes is protected by the JWT
  app.get('/me', profile)
}
