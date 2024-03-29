import { RegionStructureType } from "../../../domain";
import domainResponse from "../../../../Shared/helpers/domainResponse";
import { RegionMongoRepository } from "../../persistence/RegionMongoRepository";
import { DistrictMongoRepository } from "../../persistence/DistrictMongoRepository";
import {
  RegisterOrUpdateRegion,
  SearchAllRegions,
  SearchRegion,
} from "../../../applications";
import { HttpStatus } from "../../../../Shared/domain";
import { RegionPaginateRequest } from "../requests/RegionPaginate.request";

export class RegionController {
  static async createOrUpdate(request: RegionStructureType, res) {
    try {
      const region = await new RegisterOrUpdateRegion(
        RegionMongoRepository.getInstance(),
        DistrictMongoRepository.getInstance(),
      ).execute(request);
      res
        .status(HttpStatus.CREATED)
        .send({ message: "Registered region", data: region });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async search(request: RegionPaginateRequest, res) {
    try {
      const list = await new SearchRegion(
        RegionMongoRepository.getInstance(),
      ).paginate(request);
      res.status(HttpStatus.OK).send({ data: list });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static searchAll = async (res) => {
    try {
      const list = await new SearchAllRegions(
        RegionMongoRepository.getInstance(),
      ).execute();

      res.status(HttpStatus.OK).send({ data: list });
    } catch (e) {
      domainResponse(e, res);
    }
  };
}
