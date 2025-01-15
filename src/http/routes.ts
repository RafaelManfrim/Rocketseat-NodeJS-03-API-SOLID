import { FastifyInstance } from 'fastify'

import { register } from './controllers/register'

export function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
