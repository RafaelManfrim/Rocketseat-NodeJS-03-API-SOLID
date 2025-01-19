import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('CreateGym Use Case', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  test('if gym is created with the correct data', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: 'Academia de musculação',
      phone: '123456789',
      latitude: 123,
      longitude: 456,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
