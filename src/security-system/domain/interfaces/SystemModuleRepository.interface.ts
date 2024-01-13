import { SystemModule } from "../SystemModule";
import { OptionModuleDTO } from "../types/option-module.type";

export interface ISystemModuleRepository {
  findModuleBySystemModuleId(
    systemModuleId: string,
  ): Promise<SystemModule | undefined>;

  upsert(systemModule: SystemModule): Promise<void>;

  upsertOptionModule(systemModule: SystemModule): Promise<void>;

  list(): Promise<SystemModule[]>;

  listByActive(): Promise<SystemModule[]>;

  listByDisable(): Promise<SystemModule[]>;

  findByOptionModuleByOptionIds(
    optionIds: string[],
  ): Promise<OptionModuleDTO[]>;
}
