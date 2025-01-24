import { CostCenter, CostCenterExists, CostCenterRequest } from "../../domain";
import { IFinancialConfigurationRepository } from "../../domain/interfaces";
import {
  IMemberRepository,
  Member,
  MemberNotFound,
} from "../../../Church/domain";
import { logger } from "../../../Shared/infrastructure";

export class CreateCostCenter {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(costCenterRequest: CostCenterRequest) {
    logger.info(`Creating cost center `, costCenterRequest);
    const responsibleMember = await this.findMember(
      costCenterRequest.responsibleMemberId,
    );

    const costCenter =
      await this.financialConfigurationRepository.findCostCenterByCostCenterId(
        costCenterRequest.costCenterId,
        costCenterRequest.churchId,
      );

    if (costCenter) {
      throw new CostCenterExists();
    }

    await this.create(costCenterRequest, responsibleMember);

    await this.financialConfigurationRepository.upsertCostCenter(costCenter);
  }

  private async findMember(responsibleMemberId: string) {
    const member = await this.memberRepository.findById(responsibleMemberId);

    if (!member) {
      throw new MemberNotFound();
    }

    return member;
  }

  private async create(
    costCenterRequest: CostCenterRequest,
    responsibleMember: Member,
  ) {
    const costCenter = CostCenter.create(
      costCenterRequest.costCenterId,
      costCenterRequest.active,
      costCenterRequest.name,
      costCenterRequest.churchId,
      responsibleMember,
      costCenterRequest.category,
      costCenterRequest.description,
    );

    await this.financialConfigurationRepository.upsertCostCenter(costCenter);
  }
}
