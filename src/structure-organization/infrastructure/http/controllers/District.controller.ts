import { RegisterOrUpdateDistrict } from "../../../applications/district/RegisterOrUpdateDistrict";
import { DistrictMongoRepository } from "../../persistence/DistrictMongoRepository";
import { HttpStatus } from "../../../../shared/domain";
import { DistrictStructureType } from "../../../domain";
import { WorldMongoRepository } from "../../../../world/infrastructure/persistence/world-mongo-repository";
import { DistrictPaginateRequest } from "../requests/DistrictPaginate.request";
import { SearchDistrict } from "../../../applications/district/SearchDistrict";
import { FindDistrictById } from "../../../applications/district/FindDistrictById";
import domainResponse from "../../../../shared/helpers/domainResponse";

export class DistrictController {
  static async createOrUpdate(request: DistrictStructureType, res) {
    try {
      await new RegisterOrUpdateDistrict(
        DistrictMongoRepository.getInstance(),
        WorldMongoRepository.getInstance(),
      ).execute(request);

      res.status(HttpStatus.CREATED).json({ message: "Registered district" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async search(request: DistrictPaginateRequest, res) {
    try {
      const data = await new SearchDistrict(
        DistrictMongoRepository.getInstance(),
      ).paginate(request);
      res.status(HttpStatus.OK).send(data);
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
}
