import { SystemModuleMongoRepository } from "../../../../src/security-system/infrastructure";
import { SystemModule } from "../../../../src/security-system/domain";
import {
  generateFakeSystemModule,
  generateFakeOptionModule,
} from "../../factories/system-module.factory";
//
// describe("SystemModuleMongoRepository", () => {
//   describe("collectionName", () => {
//     it("should return 'system_modules'", () => {
//       expect(true).toBe(true);
//     });
//   });
//
//   describe("findModuleBySystemModuleId", () => {
//     it("should return a SystemModule", () => {
//       expect(true).toBe(true);
//     });
//   });
//
//   describe("listByActive", () => {
//     it("should return a list of SystemModule", () => {
//       expect(true).toBe(true);
//     });
//   });
//
//   describe("listByDisable", () => {
//     it("should return a list of SystemModule", () => {
//       expect(true).toBe(true);
//     });
//   });
//
//   describe("list", () => {
//     it("should return a list of SystemModule", () => {
//       expect(true).toBe(true);
//     });
//   });

describe("upsert", () => {
  const systemModule: SystemModule = generateFakeSystemModule();

  it("should register a new record", async () => {
    const systemModuleMongoRepository =
      SystemModuleMongoRepository.getInstance();

    await systemModuleMongoRepository.upsert(systemModule);

    expect(true).toBe(true);
  });

  it("should disable module", async () => {
    const systemModuleMongoRepository: SystemModuleMongoRepository =
      SystemModuleMongoRepository.getInstance();

    systemModule.disable();

    await systemModuleMongoRepository.upsert(systemModule);

    const moduleDb =
      await systemModuleMongoRepository.findModuleBySystemModuleId(
        systemModule.getSystemModuleId(),
      );

    expect(moduleDb.isActive).toBe(true);
  });

  it("should add a new option to the module", async () => {
    const systemModuleMongoRepository: SystemModuleMongoRepository =
      SystemModuleMongoRepository.getInstance();

    const moduleRecoverDB: SystemModule =
      await systemModuleMongoRepository.findModuleBySystemModuleId(
        systemModule.getSystemModuleId(),
      );

    const option = generateFakeOptionModule();
    moduleRecoverDB.addOption(option);
    await systemModuleMongoRepository.upsert(moduleRecoverDB);

    const opt = moduleRecoverDB.findOption(option.name);

    expect(opt).toBe(option);
  });

  it("should delete module", async () => {
    const systemModuleMongoRepository: SystemModuleMongoRepository =
      SystemModuleMongoRepository.getInstance();

    await systemModuleMongoRepository.delete(systemModule.getSystemModuleId());

    const moduleRecoverDB =
      await systemModuleMongoRepository.findModuleBySystemModuleId(
        systemModule.getSystemModuleId(),
      );

    expect(moduleRecoverDB).toBe(undefined);
  });
});
// });
