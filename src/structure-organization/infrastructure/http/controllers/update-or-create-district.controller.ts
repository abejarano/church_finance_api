import { Response } from "express";
import { RegisterOrUpdateDistrict } from "../../../usecase/register-or-update-district";
import { DistrictMongoRepository } from "../../persistence/district-mongo-repository";
import { DomainException, HttpStatus } from "../../../../shared";
import { DistrictStructureType } from "../../../domain";
import { WorldMongoRepository } from "../../../../world/infrastructure/persistence/world-mongo-repository";
import { DistrictPaginateRequest } from "../requests/district-paginate.request";
import { SearchDistrict } from "../../../usecase/search-district";

export class DistrictController {
  static async createOrUpdate(request: DistrictStructureType, res: Response) {
    try {
      await new RegisterOrUpdateDistrict(
        DistrictMongoRepository.getInstance(),
        WorldMongoRepository.getInstance(),
      ).execute(request);

      res.status(HttpStatus.CREATED).json({ message: "District created" });
    } catch (e) {
      if (e instanceof DomainException) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ code: e.getErrorCode(), message: e.getMessage() });
        return;
      }

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  static async search(request: DistrictPaginateRequest, res: Response) {
    try {
      const data = await new SearchDistrict(
        DistrictMongoRepository.getInstance(),
      ).paginate(request);
      res.status(HttpStatus.OK).json(data);
    } catch (e) {}
  }

  static async findByDistrictId(districtId: string, res: Response) {
    try {
      res.status(HttpStatus.CREATED).json({ message: districtId });
    } catch (e) {}
  }
}
