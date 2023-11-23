import { RegionStructureType } from "../../../domain";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { RegionMongoRepository } from "../../persistence/RegionMongoRepository";
import { DistrictMongoRepository } from "../../persistence/DistrictMongoRepository";
import { RegisterOrUpdateRegion } from "../../../applications/region/RegisterOrUpdateRegion";
import { SearchRegion } from "../../../applications/region/SearchRegion";
import { HttpStatus } from "../../../../shared";
import { RegionPaginateRequest } from "../requests/RegionPaginate.request";
import { Response } from "express";

export class RegionController {
  static async createOrUpdate(request: RegionStructureType, res: Response) {
    try {
      await new RegisterOrUpdateRegion(
        RegionMongoRepository.getInstance(),
        DistrictMongoRepository.getInstance(),
      ).execute(request);
      res.status(HttpStatus.CREATED).json({ message: "Registered region" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async search(request: RegionPaginateRequest, res: Response) {
    try {
      const list = await new SearchRegion(
        RegionMongoRepository.getInstance(),
      ).paginate(request);
      res.status(HttpStatus.OK).json(list);
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
