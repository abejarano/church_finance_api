import {
  ActionNotAllowed,
  IProfileRepository,
  OptionModuleDTO,
} from "../../domain";
import { logger } from "../../../shared/infrastructure";

export class ValidateActionInSystem {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(
    profileId: string[],
    url: string,
    action: string,
  ): Promise<boolean> {
    logger.info(
      `ValidateActionInSystem.run - profileId: ${profileId} - url: ${url} - action: ${action}`,
    );

    const permission: OptionModuleDTO =
      await this.profileRepository.searchPermissionByURLModuleOptionAndProfileId(
        profileId,
        url,
        action,
      );

    if (!permission) {
      throw new ActionNotAllowed();
    }

    return true;
  }
}
