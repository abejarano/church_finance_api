import { SystemModule } from "../system-module";

export interface ISystemModuleRepository {
  findModuleBySystemModuleId(
    systemModuleId: string,
  ): Promise<SystemModule | undefined>;
  upsert(systemModule: SystemModule): Promise<void>;
  list(): Promise<SystemModule[]>;
  listByActive(): Promise<SystemModule[]>;
  listByDisable(): Promise<SystemModule[]>;
}
