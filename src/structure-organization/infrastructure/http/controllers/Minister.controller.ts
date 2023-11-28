import { HttpStatus } from "../../../../shared/domain";
import { RegisterOrUpdateMinister } from "../../../applications/minister/RegisterOrUpdateMinister";
import { MinisterMongoRepository } from "../../persistence/MinisterMongoRepository";
import { RegionMongoRepository } from "../../persistence/RegionMongoRepository";
import { Minister, MinisterStructureType } from "../../../domain";
import { Response } from "express";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { FindMinisterByDNI } from "../../../applications/minister/FindMinisterByDNI";
import { MinisterPaginateRequest } from "../requests/MinisterPaginate.request";
import { SearchMinister } from "../../../applications/minister/SearchMinister";

export class MinisterController {
  static async createOrUpdate(request: MinisterStructureType, res: Response) {
    try {
      await new RegisterOrUpdateMinister(
        MinisterMongoRepository.getInstance(),
        RegionMongoRepository.getInstance(),
      ).execute(request);

      res.status(HttpStatus.CREATED).json({ message: "Registered minister" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findByDNI(ministerDni: string, res: Response) {
    try {
      const minister: Minister = await new FindMinisterByDNI(
        MinisterMongoRepository.getInstance(),
      ).execute(ministerDni);

      res.status(HttpStatus.CREATED).json({ data: minister });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async search(request: MinisterPaginateRequest, res: Response) {
    try {
      const ministers = await new SearchMinister(
        MinisterMongoRepository.getInstance(),
      ).execute(request);

      res.status(HttpStatus.OK).json(ministers);
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
