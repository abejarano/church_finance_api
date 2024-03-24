import {
  CreateModuleRequest,
  ISystemModuleRepository,
  ModuleNotFound,
  SystemModule,
} from "../../domain";

export class CreateOrUpdateModule {
  constructor(private readonly moduleRepository: ISystemModuleRepository) {}

  async execute(module: CreateModuleRequest): Promise<SystemModule> {
    if (module.systemModuleId) {
      await this.updateModule(module);
      return;
    }

    const createModule: SystemModule = SystemModule.create(
      module.name,
      module.description,
      module.isActive,
    );

    await this.moduleRepository.upsert(createModule);

    return createModule;
  }

  private async updateModule(
    moduleRequest: CreateModuleRequest,
  ): Promise<void> {
    const module = await this.moduleRepository.findModuleBySystemModuleId(
      moduleRequest.systemModuleId,
    );
    if (!module) {
      throw new ModuleNotFound();
    }

    moduleRequest.isActive ? module.enable() : module.disable();

    module.setDescription(moduleRequest.description);
    module.setName(moduleRequest.name);

    await this.moduleRepository.upsert(module);
  }
}
