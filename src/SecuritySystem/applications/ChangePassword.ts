import {
  IPasswordAdapter,
  IUserRepository,
  User,
  UserNotFound,
} from "../domain"
import { Logger } from "../../Shared/adapter"

export class ChangePassword {
  private logger = Logger("ChangePassword")

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordAdapter: IPasswordAdapter
  ) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      this.logger.error(`User with email ${email} not found`)
      throw new UserNotFound(email)
    }

    user.setUpdatePassword(await this.passwordAdapter.encrypt(password))

    await this.userRepository.updatePassword(user)

    return user
  }
}
