import { RegionMongoRepository } from "../../../../structure-organization";
import { HttpStatus } from "../../../../shared/domain";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { ChurchRequest } from "../requests/Church.request";
import { CreateOrUpdateChurch } from "../../../applications/church/CreateOrUpdateChurch";
import { ChurchMongoRepository } from "../../persistence/ChurchMongoRepository";
import { ChurchPaginateRequest } from "../requests/ChurchPaginate.request";
import { SearchChurch } from "../../../applications/church/SearchChurch";
import { FindChurchById } from "../../../applications/church/FindChurchById";
import { Church } from "../../../domain";
import { NativeEventBus } from "../../../../shared/infrastructure/eventBus/NativeEventBus";

export class ChurchController {
  static async createOrUpdate(request: ChurchRequest, res) {
    try {
      await new CreateOrUpdateChurch(
        ChurchMongoRepository.getInstance(),
        RegionMongoRepository.getInstance(),
        NativeEventBus.getInstance(),
      ).execute(request);

      res.status(HttpStatus.CREATED).send({ message: "Registered church" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async list(req: ChurchPaginateRequest, res) {
    try {
      const churches = await new SearchChurch(
        ChurchMongoRepository.getInstance(),
      ).execute(req);

      res.status(HttpStatus.OK).json(churches);
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findByChurchId(churchId: string, res) {
    try {
      const church: Church = await new FindChurchById(
        ChurchMongoRepository.getInstance(),
      ).execute(churchId);

      res.status(HttpStatus.OK).json(church);
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
