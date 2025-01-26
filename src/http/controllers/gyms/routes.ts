import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { nearby } from './nearby'
import { searh } from './search'
import { create } from './create'

export function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searh)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
