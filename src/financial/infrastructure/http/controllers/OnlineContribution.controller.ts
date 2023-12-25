import { Response } from "express";
import { ContributionRequest } from "../../../domain";
import { FindMemberById } from "../../../../church/applications/members/FindMemberById";
import { MemberMongoRepository } from "../../../../church/infrastructure";
import domainResponse from "../../../../shared/helpers/domainResponse";
import {
  ListContributions,
  RegisterContributionsOnline,
} from "../../../applications";
import { OnlineContributionsMongoRepository } from "../../persistence/OnlineContributionsMongoRepository";
import { HttpStatus } from "../../../../shared/domain";
import { FilterContributionsRequest } from "../../../domain/requests/FilterContributions.request";
import { logger } from "../../../../shared/infrastructure";

export class OnlineContributionController {
  static async onlineContributions(
    request: ContributionRequest,
    res: Response,
  ) {
    try {
      logger.info(`Solicitud de registro de contribucion en línea:`, request);

      const member = await new FindMemberById(
        MemberMongoRepository.getInstance(),
      ).execute(request.memberId);

      await new RegisterContributionsOnline(
        OnlineContributionsMongoRepository.getInstance(),
      ).execute(request, member);

      res
        .status(HttpStatus.CREATED)
        .json({ message: "successful contribution registration" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async listOnlineContributions(
    request: FilterContributionsRequest,
    res: Response,
  ) {
    try {
      const list = await new ListContributions(
        OnlineContributionsMongoRepository.getInstance(),
      ).execute(request);

      res.status(HttpStatus.OK).json({ data: list });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
