import {
  FindDistrictById,
  RegisterOrUpdateDistrict,
  SearchAllDistricts,
} from "../../../applications";
import { DistrictMongoRepository } from "../../persistence/DistrictMongoRepository";
import { HttpStatus } from "../../../../Shared/domain";
import { DistrictStructureType } from "../../../domain";
import { WorldMongoRepository } from "../../../../World/infrastructure/persistence/world-mongo-repository";
import { DistrictPaginateRequest } from "../requests/DistrictPaginate.request";
import { SearchDistrict } from "../../../applications/district/SearchDistrict";
import domainResponse from "../../../../Shared/helpers/domainResponse";

export class DistrictController {
  static async createOrUpdate(request: DistrictStructureType, res) {
    try {
      await new RegisterOrUpdateDistrict(
        DistrictMongoRepository.getInstance(),
        WorldMongoRepository.getInstance(),
      ).execute(request);

      res.status(HttpStatus.CREATED).send({ message: "Registered district" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async search(request: DistrictPaginateRequest, res) {
    try {
      const data = await new SearchDistrict(
        DistrictMongoRepository.getInstance(),
      ).paginate(request);
      res.status(HttpStatus.OK).send({ data });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findByDistrictId(districtId: string, res) {
    try {
      const district = await new FindDistrictById(
        DistrictMongoRepository.getInstance(),
      ).execute(districtId);

      res.status(HttpStatus.CREATED).send({ data: district });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async searchAll(res) {
    try {
      const list = await new SearchAllDistricts(
        DistrictMongoRepository.getInstance(),
      ).execute();
      res.status(HttpStatus.OK).send({ data: list });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
