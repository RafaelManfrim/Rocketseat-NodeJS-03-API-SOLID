import { beforeEach, describe, expect, test } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  test('if user can get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('password', 8),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual(createdUser.name)
  })

  test('if user can not get user profile with id not existent', async () => {
    await expect(() =>
      sut.execute({
        userId: 'id-not-existent',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
