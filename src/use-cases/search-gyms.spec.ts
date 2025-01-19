import { beforeEach, describe, expect, test } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('SearchGyms Use Case', async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  test('if user can search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia',
      description: 'Academia de musculação',
      phone: '123456789',
      latitude: 123,
      longitude: 456,
    })

    await gymsRepository.create({
      title: 'Academia 2',
      description: 'Academia de musculação 2',
      phone: '123456789',
      latitude: 456,
      longitude: 789,
    })

    const { gyms } = await sut.execute({ query: 'Academia 2', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia 2',
        description: 'Academia de musculação 2',
      }),
    ])
  })

  test('if user can search for paginated gyms', async () => {
    // starts from 0
    for (const gymId of Array.from({ length: 22 }, (_, i) => i)) {
      await gymsRepository.create({
        title: `Academia ${gymId}`,
        description: 'Academia de musculação',
        phone: '123456789',
        latitude: 123,
        longitude: 456,
      })
    }

    const { gyms } = await sut.execute({ query: 'Academia', page: 1 })

    expect(gyms).toHaveLength(20)

    const { gyms: gymsPage2 } = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gymsPage2).toHaveLength(2)
    expect(gymsPage2).toEqual([
      expect.objectContaining({
        title: 'Academia 20',
      }),
      expect.objectContaining({
        title: 'Academia 21',
      }),
    ])
  })
})
