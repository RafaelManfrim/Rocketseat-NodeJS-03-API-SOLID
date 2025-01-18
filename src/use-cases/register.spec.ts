import { describe, expect, test } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', async () => {
  test('if user is created with the correct data', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('if user password is hashed upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test("if user is not be able to register using an email that's already in use", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'john@doe.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'password',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Mary Jane',
        email,
        password: 'password2',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
