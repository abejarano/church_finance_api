import { Response } from "express";
import { RegionMongoRepository } from "../../../../structure-organization";
import { HttpStatus } from "../../../../shared";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { ChurchRequest } from "../requests/Church.request";
import { CreateOrUpdateChurch } from "../../../applications/church/CreateOrUpdateChurch";
import { ChurchMongoRepository } from "../../persistence/ChurchMongoRepository";

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
}
