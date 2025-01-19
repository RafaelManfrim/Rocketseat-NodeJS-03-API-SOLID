import { beforeEach, describe, expect, test } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('GetUserMetrics Use Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  test('if user can get their metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id',
    })

    await checkInRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id',
    })

    const { checkInsCount } = await sut.execute({ userId: 'user-id' })

    expect(checkInsCount).toBe(2)
  })
})
