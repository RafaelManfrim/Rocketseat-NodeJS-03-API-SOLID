import { describe, expect, test } from 'vitest'

import { AuthenticateUseCase } from './authenticate'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', async () => {
  test('if user should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('password', 8),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'john@doe.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('if user should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('password', 8),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'mary@jane.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('if user should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('password', 8),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'john@doe.com',
        password: 'password2',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
