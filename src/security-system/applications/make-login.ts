import {
  InvalidPassword,
  UserDisabled,
  UserNotFoundException,
} from "../exceptions";
import { IAuthToken, IUserRepository, User } from "../domain";

export class MakeLogin {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly validatePass: Function,
    private readonly authToken: IAuthToken,
  ) {}

  async execute(emailUser: string, passUser: string): Promise<[User, string]> {
    const user: User = await this.userRepository.findByEmail(emailUser);

    if (!user) {
      throw new UserNotFoundException(emailUser);
    }

    if (!user.isActive()) {
      throw new UserDisabled(emailUser);
    }

    if (!this.validatePass(passUser, user.getPassword())) {
      throw new InvalidPassword();
    }

    return [
      user,
      this.authToken.createToken({
        userId: user.getUserId(),
        email: user.getEmail(),
        isStaff: user.staff(),
        isSuperuser: user.superUser(),
        profileId: user.getProfileId(),
      }),
    ];
  }
}
