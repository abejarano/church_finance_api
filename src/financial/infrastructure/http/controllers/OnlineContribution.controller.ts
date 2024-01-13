import {
  ContributionRequest,
  FilterContributionsRequest,
} from "../../../domain";
import { FindMemberById } from "../../../../church/applications";
import { MemberMongoRepository } from "../../../../church/infrastructure";
import domainResponse from "../../../../shared/helpers/domainResponse";
import {
  ListContributions,
  RegisterContributionsOnline,
} from "../../../applications";
import { OnlineContributionsMongoRepository } from "../../persistence/OnlineContributionsMongoRepository";
import { HttpStatus } from "../../../../shared/domain";
import { logger } from "../../../../shared/infrastructure";
import MemberContributionsDTO from "../dto/MemberContributionsDTO";
import { FindFinancialConceptByChurchIdAndFinancialConceptId } from "../../../applications/financialConfiguration/finders/FindFinancialConceptByChurchIdAndFinancialConceptId";
import { FinancialConfigurationMongoRepository } from "../../persistence/FinancialConfigurationMongoRepository";

export const onlineContributionsController = async (
  request: ContributionRequest,
  res,
) => {
  try {
    logger.info(`Solicitud de registro de contribucion en línea:`);

    const member = await new FindMemberById(
      MemberMongoRepository.getInstance(),
    ).execute(request.memberId);

    const financialConcept =
      await new FindFinancialConceptByChurchIdAndFinancialConceptId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(member.getChurchId(), request.financeConceptId);

    await new RegisterContributionsOnline(
      OnlineContributionsMongoRepository.getInstance(),
    ).execute(request, member, financialConcept);

    res
      .status(HttpStatus.CREATED)
      .send({ message: "successful contribution registration" });
  } catch (e) {
    return domainResponse(e, res);
  }
};

export const listOnlineContributionsController = async (
  request: FilterContributionsRequest,
  res,
) => {
  try {
    const list = await new ListContributions(
      OnlineContributionsMongoRepository.getInstance(),
    ).execute(request);

    res.status(HttpStatus.OK).send({ data: MemberContributionsDTO(list) });
  } catch (e) {
    domainResponse(e, res);
  }
};
