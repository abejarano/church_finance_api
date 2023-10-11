import { DistrictDTO } from "../../../domain/types/district.type";
import { Response } from "express";
import { RegisterOrUpdateDistrict } from "../../../usecase/register-or-update-district";
import { DistrictMongoRepository } from "../../persistence/district-mongo-repository";
import { DomainException, HttpStatus } from "../../../../shared";

export class UpdateOrCreateDistrictController {
  static async handle(request: DistrictDTO, res: Response) {
    try {
      await new RegisterOrUpdateDistrict(
        DistrictMongoRepository.getInstance(),
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
}
