import { HttpStatus } from "../../../../Shared/domain";
import domainResponse from "../../../../Shared/helpers/domainResponse";
import { ChurchRequest } from "../requests/Church.request";
import {
  CreateOrUpdateChurch,
  FindChurchById,
  SearchChurches,
  WithoutAssignedMinister,
} from "../../../applications";
import { ChurchMongoRepository } from "../../persistence/ChurchMongoRepository";
import { ChurchPaginateRequest } from "../requests/ChurchPaginate.request";
import { Church } from "../../../domain";
import { NativeEventBus } from "../../../../Shared/infrastructure/eventBus/NativeEventBus";
import {
  MinisterMongoRepository,
  RegionMongoRepository,
} from "../../../../OrganizacionalStructure/infrastructure";
import PaginateChurchDto from "../DTO/paginateChurch.dto";

export class ChurchController {
  static async createOrUpdate(request: ChurchRequest, res) {
    try {
      await new CreateOrUpdateChurch(
        ChurchMongoRepository.getInstance(),
        RegionMongoRepository.getInstance(),
        NativeEventBus.getInstance(),
      ).execute(request);

      res.status(HttpStatus.CREATED).send({ message: "Registered Church" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async list(req: ChurchPaginateRequest, res) {
    try {
      const churches = await new SearchChurches(
        ChurchMongoRepository.getInstance(),
      ).execute(req);

      res.status(HttpStatus.OK).send({
        data: PaginateChurchDto(
          churches,
          await MinisterMongoRepository.getInstance().allActive(),
        ),
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findByChurchId(churchId: string, res) {
    try {
      const church: Church = await new FindChurchById(
        ChurchMongoRepository.getInstance(),
      ).execute(churchId);

      res.status(HttpStatus.OK).send(church);
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async listWithoutAssignedMinister(res) {
    try {
      const churches = await new WithoutAssignedMinister(
        ChurchMongoRepository.getInstance(),
      ).execute();

      res.status(HttpStatus.OK).send({
        data: churches,
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
