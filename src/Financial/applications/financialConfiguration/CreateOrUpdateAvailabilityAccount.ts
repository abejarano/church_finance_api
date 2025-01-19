import { IChurchRepository } from "../../../Church/domain";
import { IFinancialConfigurationRepository } from "../../domain/interfaces";
import { AvailabilityAccount, AvailabilityAccountRequest } from "../../domain";

export class CreateOrUpdateAvailabilityAccount {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async execute(requestAvailabilityAccount: AvailabilityAccountRequest) {
    if (!requestAvailabilityAccount.availabilityAccountId) {
      await this.registerAvailabilityAccount(requestAvailabilityAccount);
      return;
    }

    const availabilityAccount: AvailabilityAccount =
      await this.financialConfigurationRepository.findAvailabilityAccountByAvailabilityAccountId(
        requestAvailabilityAccount.availabilityAccountId,
      );

    availabilityAccount.setAccountName(requestAvailabilityAccount.accountName);
    availabilityAccount.setNewBalance(requestAvailabilityAccount.balance);
    requestAvailabilityAccount.active
      ? availabilityAccount.enable()
      : availabilityAccount.disable();

    await this.financialConfigurationRepository.upsertAvailabilityAccount(
      availabilityAccount,
    );
  }

  private async registerAvailabilityAccount(
    requestAvailabilityAccount: AvailabilityAccountRequest,
  ): Promise<void> {
    const availabilityAccount = AvailabilityAccount.create(
      requestAvailabilityAccount.churchId,
      requestAvailabilityAccount.accountName,
      requestAvailabilityAccount.active,
      requestAvailabilityAccount.accountType,
    );
    await this.financialConfigurationRepository.upsertAvailabilityAccount(
      availabilityAccount,
    );
  }
}
