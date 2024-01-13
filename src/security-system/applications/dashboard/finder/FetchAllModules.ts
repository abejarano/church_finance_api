import { ISystemModuleRepository, SystemModule } from "../../../domain";

export class FetchAllModules {
  constructor(private readonly moduleRepository: ISystemModuleRepository) {}

  async execute(): Promise<SystemModule[]> {
    return await this.moduleRepository.list();
  }
}
