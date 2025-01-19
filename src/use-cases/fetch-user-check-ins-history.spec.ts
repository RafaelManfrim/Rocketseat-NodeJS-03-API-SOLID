import { beforeEach, describe, expect, test } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('FetchUserCheckInsHistory Use Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  test('if user can fetch check in history', async () => {
    await checkInRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id',
    })

    await checkInRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id',
    })

    const { checkIns } = await sut.execute({ userId: 'user-id', page: 1 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-id-1',
      }),
      expect.objectContaining({
        gym_id: 'gym-id-2',
      }),
    ])
  })

  test('if user can fetch paginated check in history', async () => {
    // starts from 0
    for (const gymId of Array.from({ length: 22 }, (_, i) => i)) {
      await checkInRepository.create({
        gym_id: `gym-id-${gymId}`,
        user_id: 'user-id',
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-id', page: 2 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-id-20',
      }),
      expect.objectContaining({
        gym_id: 'gym-id-21',
      }),
    ])
  })
})
