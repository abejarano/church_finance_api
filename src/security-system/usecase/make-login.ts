import { InvalidPassword, UserDisabled, UserNotFound } from "../exceptions";
import { IAuthToken, IUserRepository, User } from "../domain";

export class MakeLogin {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly validatePass: Function,
    private readonly authToken: IAuthToken,
  ) {}

  async run(emailUser: string, passUser: string): Promise<[User, string]> {
    const user: User = await this.userRepository.findByEmail(emailUser);

    if (!user) {
      throw new UserNotFound(emailUser);
    }

    if (!user.isActive()) {
      throw new UserDisabled(emailUser);
    }

    if (!this.validatePass(passUser, user.getPassword())) {
      throw new InvalidPassword();
    }

    return [user, this.authToken.createToken(user)];
  }
}
