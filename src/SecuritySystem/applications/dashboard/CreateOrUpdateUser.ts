import {
  CreateUserRequest,
  IPasswordAdapter,
  IProfileRepository,
  IUserRepository,
  User,
  UserNotFound,
} from "../../domain";

export class CreateOrUpdateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly profileRepository: IProfileRepository,
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
      userRequest.isSuperuser,
      await this.profileRepository.findByProfileIds(userRequest.profileId),
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
    userRequest.isSuperuser ? user.setSuperuser() : user.unsetSuperuser();

    user.setEmail(userRequest.email);

    const profiles = await this.profileRepository.findByProfileIds(
      userRequest.profileId,
    );

    user.deleteAllProfile();
    for (const profile of profiles) {
      user.setProfile(profile);
    }

    await this.userRepository.upsert(user);

    return user;
  }
}
