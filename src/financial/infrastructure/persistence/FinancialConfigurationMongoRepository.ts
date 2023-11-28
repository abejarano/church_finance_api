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
    return "churches";
  }

  async searchBanksByChurchId(churchId: string): Promise<Bank[]> {
    const collection = await this.collection();

    const result = await collection.findOne(
      {
        churchId,
      },
      {
        projection: {
          _id: 1,
          churchId: 1,
          banks: 1,
        },
      },
    );

    if (!result) {
      return [];
    }

    return result.banks.map((bank: any) =>
      Bank.fromPrimitives({
        id: result._id.toString(),
        churchId: result.churchId,
        ...bank,
      }),
    );
  }

  async upsertBank(bank: Bank): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne(
      { churchId: bank.getChurchId() },
      { $push: { banks: bank.toPrimitives() } },
      { upsert: true },
    );
  }

  async upsertFinancialConcept(concept: FinanceConcept): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne(
      { churchId: concept.getChurchId() },
      { $push: { financialConcepts: concept.toPrimitives() } },
      { upsert: true },
    );
  }

  async upsertCostCenter(costCenter: CostCenter): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne(
      {
        churchId: costCenter.getChurchId(),
      },
      { $push: { costCenters: costCenter.toPrimitives() } },
      { upsert: true },
    );
  }

  async findCostCenterByCostCenterId(
    costCenterId: string,
  ): Promise<CostCenter> {
    const collection = await this.collection();
    const result = await collection.findOne(
      { "costCenters.costCenterId": costCenterId },
      { projection: { _id: 1, churchId: 1, "costCenters.$": 1 } },
    );

    if (!result) {
      return undefined;
    }

    const bank = await this.findBankByBankId(result.bankId);

    return CostCenter.fromPrimitives(
      {
        id: result._id.toString(),
        churchId: result.churchId,
        ...result.costCenters[0],
      },
      bank,
    );
  }

  async findBankByBankId(bankId: string): Promise<Bank> {
    const collection = await this.collection();
    const result = await collection.findOne(
      { "banks.bankId": bankId },
      { projection: { _id: 1, churchId: 1, "banks.$": 1 } },
    );

    if (!result) {
      return undefined;
    }

    return Bank.fromPrimitives({
      id: result._id.toString(),
      churchId: result.churchId,
      ...result.banks[0],
    });
  }

  async searchCenterCostsByChurchId(churchId: string): Promise<CostCenter[]> {
    const collection = await this.collection();
    const result = await collection.findOne(
      { churchId },
      { projection: { _id: 1, costCenters: 1 } },
    );

    if (result.length === 0) {
      return [];
    }

    const listCostCenter: CostCenter[] = [];

    for (const costCenter of result.costCenters) {
      const bank = await this.findBankByBankId(costCenter.bankId);
      listCostCenter.push(
        CostCenter.fromPrimitives(
          { id: result._id.toString(), ...costCenter },
          bank,
        ),
      );
    }
    return listCostCenter;
  }
}
