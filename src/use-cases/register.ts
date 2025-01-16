import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseParams) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('E-mail already exists')
    }

    const passwordHash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
