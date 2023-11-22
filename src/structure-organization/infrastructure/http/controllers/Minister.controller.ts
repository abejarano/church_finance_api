import { HttpStatus } from "../../../../shared";
import { RegisterOrUpdateMinister } from "../../../usecase/minister/RegisterOrUpdateMinister";
import { MinisterMongoRepository } from "../../persistence/MinisterMongoRepository";
import { RegionMongoRepository } from "../../persistence/RegionMongoRepository";
import { Minister, MinisterStructureType } from "../../../domain";
import { Response } from "express";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { FindMinisterById } from "../../../usecase/minister/FindMinisterById";

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

  static async findById(ministerId: string, res: Response) {
    try {
      const minister: Minister = await new FindMinisterById(
        MinisterMongoRepository.getInstance(),
      ).execute(ministerId);

      res.status(HttpStatus.CREATED).json({ data: minister });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
