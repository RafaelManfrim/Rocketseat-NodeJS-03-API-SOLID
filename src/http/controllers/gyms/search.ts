import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function searh(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    search: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { search, page } = searchGymQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    page,
    query: search,
  })

  return reply.send({
    gyms,
  })
}
