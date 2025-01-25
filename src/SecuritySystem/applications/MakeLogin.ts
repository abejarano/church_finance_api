import {
  IAuthToken,
  InvalidPassword,
  IPasswordAdapter,
  IUserRepository,
  User,
  UserDisabled,
  UserNotFound,
} from "../domain"

export class MakeLogin {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordAdapter: IPasswordAdapter,
    private readonly authToken: IAuthToken
  ) {}

  async execute(emailUser: string, passUser: string): Promise<[User, string]> {
    const user: User = await this.userRepository.findByEmail(emailUser)

    if (!user) {
      throw new UserNotFound(emailUser)
    }

    if (!user.isActive) {
      throw new UserDisabled(emailUser)
    }

    if (!(await this.passwordAdapter.check(passUser, user.getPassword()))) {
      throw new InvalidPassword()
    }

    return [
      user,
      this.authToken.createToken({
        churchId: user.getChurchId(),
        userId: user.getUserId(),
        email: user.getEmail(),
        profiles: user.getProfiles(),
      }),
    ]
  }
}
