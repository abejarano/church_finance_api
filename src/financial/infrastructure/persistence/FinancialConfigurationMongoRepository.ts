import {
  MongoClientFactory,
  MongoRepository,
} from "../../../shared/infrastructure";
import {
  Bank,
  CostCenter,
  FinanceConcept,
  IFinancialConfigurationRepository,
} from "../../domain";

export class FinancialConfigurationMongoRepository
  extends MongoRepository<any>
  implements IFinancialConfigurationRepository
{
  private static instance: FinancialConfigurationMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  static getInstance(): FinancialConfigurationMongoRepository {
    if (!FinancialConfigurationMongoRepository.instance) {
      FinancialConfigurationMongoRepository.instance =
        new FinancialConfigurationMongoRepository();
    }
    return FinancialConfigurationMongoRepository.instance;
  }

  collectionName(): string {
    return "financial_configuration";
  }

  searchBanksByChurchId(churchId: string): Promise<Bank[]> {
    return Promise.resolve([]);
  }

  async upsertBank(bank: Bank): Promise<void> {
    return Promise.resolve(undefined);
  }

  async findCostCenterByCostCenterId(
    costCenterId: string,
  ): Promise<CostCenter> {
    const collection = await this.collection();
    const result = await collection.findOne(
      { "costCenters.costCenterId": costCenterId },
      { projection: { "costCenters.$": 1 } },
    );

    if (!result) {
      return undefined;
    }

    const bank = await this.findBankByBankId(result.bankId);

    return CostCenter.fromPrimitives(
      { id: result._id.toString(), ...result },
      bank,
    );
  }

  async findBankByBankId(bankId: string): Promise<Bank> {
    const collection = await this.collection();
    const result = await collection.findOne(
      { "banks.bankId": bankId },
      { projection: { "banks.$": 1 } },
    );

    if (!result) {
      return undefined;
    }

    return Bank.fromPrimitives({ id: result._id.toString(), ...result });
  }

  async searchCenterCostsByChurchId(churchId: string): Promise<CostCenter[]> {
    const collection = await this.collection();
    const result = await collection
      .find({ churchId })
      .project({ "costCenters.$": 1 })
      .toArray();

    if (!result) {
      return [];
    }

    return await Promise.all(
      result.map(async (costCenter) => {
        const bank = await this.findBankByBankId(costCenter.bankId);
        return CostCenter.fromPrimitives(
          { id: costCenter._id.toString(), ...costCenter },
          bank,
        );
      }),
    );
  }

  async upsertCostCenter(costCenter: CostCenter): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne(
      { churchId: costCenter.getChurchId() },
      { $push: { costCenters: costCenter.toPrimitives() } },
      { upsert: true },
    );
  }

  upsertFinanceConcept(concept: FinanceConcept): Promise<void> {
    return Promise.resolve(undefined);
  }
}
