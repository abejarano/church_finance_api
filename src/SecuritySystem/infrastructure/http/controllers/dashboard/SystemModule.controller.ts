import {
  AddOptionToModuleRequest,
  CreateModuleRequest,
  SystemModule,
} from "../../../../domain";
import {
  AddOptionIntoModule,
  CreateOrUpdateModule,
  FetchAllModules,
} from "../../../../applications";
import { SystemModuleMongoRepository } from "../../../persistence/SystemModuleMongoRepository";
import { HttpStatus } from "../../../../../Shared/domain";
import domainResponse from "../../../../../Shared/helpers/domainResponse";

export class SystemModuleController {
  static async fetchAllModules(res) {
    try {
      const modules: SystemModule[] = await new FetchAllModules(
        SystemModuleMongoRepository.getInstance(),
      ).execute();

      res.status(HttpStatus.OK).send({
        message: "Modulos encontrados",
        data: modules,
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async createModule(payload: CreateModuleRequest, res) {
    try {
      const systemModule: SystemModule = await new CreateOrUpdateModule(
        SystemModuleMongoRepository.getInstance(),
      ).execute(payload);

      res.status(HttpStatus.CREATED).send({
        message: "Modulo creado",
        data: systemModule,
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async addOptionsToModule(payload: AddOptionToModuleRequest, res) {
    try {
      const option = await new AddOptionIntoModule(
        SystemModuleMongoRepository.getInstance(),
      ).execute(payload);

      res.status(HttpStatus.CREATED).send({
        message: "Options agregadas con exito",
        data: option,
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
