import { IPasswordAdapter, IUserAppRepository, UserApp } from "../domain";
import { InvalidPassword, UserNotFound } from "../exceptions";

export class LoginUserApp {
  constructor(
    private readonly userAppRepository: IUserAppRepository,
    private readonly passwordAdapter: IPasswordAdapter,
  ) {}

  async execute(email: string, password: string): Promise<any> {
    const user: UserApp = await this.userAppRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFound(email);
    }
    if (!(await this.passwordAdapter.check(password, user.getPassword()))) {
      throw new InvalidPassword();
    }

    const jsonObj = user.toPrimitives();

    delete jsonObj.password;

    return jsonObj;
  }
}
