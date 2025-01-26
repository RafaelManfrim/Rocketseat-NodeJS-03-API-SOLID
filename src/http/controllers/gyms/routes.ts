import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'

export function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
