import {
  CreateUserRequest,
  IPasswordAdapter,
  IUserRepository,
  User,
  UserNotFound,
} from "../domain";

export class CreateOrUpdateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordAdapter: IPasswordAdapter,
  ) {}

  async execute(userRequest: CreateUserRequest): Promise<User> {
    if (userRequest.userId) {
      return await this.updateUser(userRequest);
    }
    const user = User.create(
      userRequest.name,
      userRequest.email,
      await this.passwordAdapter.encrypt(userRequest.password),
      userRequest.profiles,
      userRequest.churchId,
    );

    await this.userRepository.upsert(user);

    return user;
  }

  private async updateUser(userRequest: CreateUserRequest): Promise<User> {
    const user: User = await this.userRepository.findByUserId(
      userRequest.userId,
    );

    if (!user) {
      throw new UserNotFound(userRequest.email);
    }

    userRequest.isActive ? user.enable() : user.disable();

    user.setEmail(userRequest.email);

    user.deleteAllProfile();
    user.setProfile(userRequest.profiles);

    await this.userRepository.upsert(user);

    return user;
  }
}
