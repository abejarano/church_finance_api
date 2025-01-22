import {
  AvailabilityAccountNotFound,
  ConceptType,
  ContributionRequest,
  FilterContributionsRequest,
  OnlineContributions,
  OnlineContributionsStatus,
} from "../../../domain";
import { FindMemberById } from "../../../../Church/applications";
import { MemberMongoRepository } from "../../../../Church/infrastructure";
import domainResponse from "../../../../Shared/helpers/domainResponse";
import {
  FindFinancialConceptByChurchIdAndFinancialConceptId,
  ListContributions,
  RegisterContributionsOnline,
  UpdateContributionStatus,
} from "../../../applications";
import { HttpStatus, Paginate, QueueName } from "../../../../Shared/domain";
import {
  logger,
  QueueBullService,
  StorageGCP,
} from "../../../../Shared/infrastructure";
import MemberContributionsDTO from "../dto/MemberContributions.dto";
import {
  AvailabilityAccountMongoRepository,
  FinancialConfigurationMongoRepository,
  OnlineContributionsMongoRepository,
} from "../../persistence";
import { FinancialYearMongoRepository } from "../../../../ConsolidatedFinancial/infrastructure";

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
      ).execute(member.getChurchId(), request.financialConceptId);

    const availabilityAccount =
      await AvailabilityAccountMongoRepository.getInstance().findAvailabilityAccountByAvailabilityAccountId(
        request.availabilityAccountId,
      );

    if (!availabilityAccount) {
      throw new AvailabilityAccountNotFound();
    }

    await new RegisterContributionsOnline(
      OnlineContributionsMongoRepository.getInstance(),
      StorageGCP.getInstance(process.env.BUCKET_FILES),
      QueueBullService.getInstance(),
      FinancialYearMongoRepository.getInstance(),
    ).execute(request, availabilityAccount, member, financialConcept);

    QueueBullService.getInstance().dispatch(
      QueueName.UpdateAvailabilityAccountBalance,
      {
        availabilityAccountId: request.availabilityAccountId,
        amount: request.amount,
        operationType:
          financialConcept.getType() === ConceptType.INCOME
            ? "MONEY_IN"
            : "MONEY_OUT",
      },
    );

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
    const list: Paginate<OnlineContributions> = await new ListContributions(
      OnlineContributionsMongoRepository.getInstance(),
    ).execute(request);

    res.status(HttpStatus.OK).send(await MemberContributionsDTO(list));
  } catch (e) {
    domainResponse(e, res);
  }
};

export const UpdateContributionStatusController = async (
  contributionId: string,
  status: OnlineContributionsStatus,
  res,
) => {
  try {
    await new UpdateContributionStatus(
      OnlineContributionsMongoRepository.getInstance(),
    ).execute(contributionId, status);

    res.status(HttpStatus.OK).send({ message: "Contribution updated" });
  } catch (e) {
    domainResponse(e, res);
  }
};
