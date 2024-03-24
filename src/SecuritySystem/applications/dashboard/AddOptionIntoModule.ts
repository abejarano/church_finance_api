import {
  AddOptionToModuleRequest,
  ISystemModuleRepository,
  ModuleNotFound,
  OptionModuleDTO,
} from "../../domain";
import { logger } from "../../../Shared/infrastructure";

export class AddOptionIntoModule {
  constructor(private readonly moduleRepository: ISystemModuleRepository) {}

  async execute(request: AddOptionToModuleRequest): Promise<OptionModuleDTO> {
    logger.info("AddOptionIntoModule.run", request);

    const module = await this.moduleRepository.findModuleBySystemModuleId(
      request.systemModuleId,
    );
    if (!module) {
      throw new ModuleNotFound();
    }

    const option = module.addOrUpdateOption(request.option);

    await this.moduleRepository.upsert(module);

    return option;
  }
}
