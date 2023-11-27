import { Bank, IFinancialConfigurationRepository } from "../../domain";
import { BankRequest } from "../../domain/requests/Bank.request";
import {
  Church,
  ChurchNotFound,
  IChurchRepository,
} from "../../../church/domain";

export class CreateOrUpdateBank {
  constructor(
    private readonly financialConfigurationRepository: IFinancialConfigurationRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async execute(requestBank: BankRequest) {
    if (!requestBank.bankId) {
      await this.registerBank(requestBank);
      return;
    }

    const bank: Bank =
      await this.financialConfigurationRepository.findBankByBankId(
        requestBank.bankId,
      );

    bank.setBankInstruction(requestBank.bankInstruction);
    bank.setAccountType(requestBank.accountType);
    bank.setInstancePaymentAddress(requestBank.addressInstancePayment);
    await this.financialConfigurationRepository.upsertBank(bank);
  }

  private async registerBank(requestBank: BankRequest): Promise<void> {
    //TODO validar si el banco ya existe
    const bank = Bank.create(
      requestBank.accountType,
      requestBank.active,
      requestBank.name,
      requestBank.tag,
      requestBank.addressInstancePayment,
      requestBank.bankInstruction,
      await this.getChurch(requestBank.churchId),
    );
    await this.financialConfigurationRepository.upsertBank(bank);
  }

  private async getChurch(churchId: string): Promise<Church> {
    const church = await this.churchRepository.findById(churchId);
    if (!church) throw new ChurchNotFound();

    return church;
  }
}
