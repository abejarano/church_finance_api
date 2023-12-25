import { RegionStructureType } from "../../../domain";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { RegionMongoRepository } from "../../persistence/RegionMongoRepository";
import { DistrictMongoRepository } from "../../persistence/DistrictMongoRepository";
import { RegisterOrUpdateRegion } from "../../../applications/region/RegisterOrUpdateRegion";
import { SearchRegion } from "../../../applications/region/SearchRegion";
import { HttpStatus } from "../../../../shared/domain";
import { RegionPaginateRequest } from "../requests/RegionPaginate.request";

export class RegionController {
  static async createOrUpdate(request: RegionStructureType, res) {
    try {
      await new RegisterOrUpdateRegion(
        RegionMongoRepository.getInstance(),
        DistrictMongoRepository.getInstance(),
      ).execute(request);
      res.status(HttpStatus.CREATED).send({ message: "Registered region" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async search(request: RegionPaginateRequest, res) {
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
