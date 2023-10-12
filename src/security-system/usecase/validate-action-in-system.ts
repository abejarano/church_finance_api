import { ActionInSystem, IUserRepository, PermissionDTO } from "../domain";

export class ValidateActionInSystem {
  constructor(private readonly userMongoRepository: IUserRepository) {}

  async execute(
    userId: string,
    url: string,
    action: ActionInSystem,
  ): Promise<boolean> {
    const permission: PermissionDTO =
      await this.userMongoRepository.searchPermissionByURLModuleOptionAndUserId(
        userId,
        url,
      );
    return permission.action.includes(action);
  }
}
