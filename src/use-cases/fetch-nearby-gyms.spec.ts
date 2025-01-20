import { beforeEach, describe, expect, test } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('FetchNearbyGyms Use Case', async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  test('if user can fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'Academia de musculação',
      phone: '123456789',
      latitude: 10,
      longitude: 15,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Academia de musculação 2',
      phone: '123456789',
      latitude: 15,
      longitude: 20,
    })

    const { gyms } = await sut.execute({
      userLatitude: 10,
      userLongitude: 15,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
