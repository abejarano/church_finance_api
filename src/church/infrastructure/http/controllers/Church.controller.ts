import { Response } from "express";
import { RegionMongoRepository } from "../../../../structure-organization";
import { HttpStatus } from "../../../../shared";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { ChurchRequest } from "../requests/Church.request";
import { CreateOrUpdateChurch } from "../../../applications/church/CreateOrUpdateChurch";
import { ChurchMongoRepository } from "../../persistence/ChurchMongoRepository";
import { ChurchPaginateRequest } from "../requests/ChurchPaginate.request";
import { SearchChurch } from "../../../applications/church/SearchChurch";
import { FindChurchById } from "../../../applications/church/FindChurchById";
import { Church } from "../../../domain";

export class ChurchController {
  static async createOrUpdate(request: ChurchRequest, res: Response) {
    try {
      await new CreateOrUpdateChurch(
        ChurchMongoRepository.getInstance(),
        RegionMongoRepository.getInstance(),
      ).execute(request);

      res.status(HttpStatus.CREATED).json({ message: "Registered church" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async list(req: ChurchPaginateRequest, res: Response) {
    try {
      const churches = await new SearchChurch(
        ChurchMongoRepository.getInstance(),
      ).execute(req);

      res.status(HttpStatus.OK).json(churches);
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findByChurchId(churchId: string, res: Response) {
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
