import {
  MongoClientFactory,
  MongoRepository,
} from "../../../Shared/infrastructure";
import {
  Bank,
  ConceptType,
  CostCenter,
  FinancialConcept,
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

  async upsertFinancialConcept(concept: FinancialConcept): Promise<void> {
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

    if (!result || !result.costCenters) {
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

  async findFinancialConceptsByChurchIdAndTypeConcept(
    churchId: string,
    typeConcept: ConceptType,
  ): Promise<FinancialConcept[]> {
    const collection = await this.collection();

    const aggregationPipeline = [
      {
        $match: {
          churchId: churchId,
          "financialConcepts.type": typeConcept,
        },
      },
      {
        $project: {
          _id: 1,
          financialConcepts: {
            $filter: {
              input: "$financialConcepts",
              as: "concept",
              cond: { $eq: ["$$concept.type", typeConcept] },
            },
          },
        },
      },
    ];

    const result = await collection.aggregate(aggregationPipeline).toArray();

    if (!result) {
      return [];
    }

    const lisFinancialConcepts: FinancialConcept[] = [];
    for (const financialConcept of result[0].financialConcepts) {
      lisFinancialConcepts.push(
        FinancialConcept.fromPrimitives(
          {
            id: result[0]._id.toString(),
            ...financialConcept,
          },
          churchId,
        ),
      );
    }

    return lisFinancialConcepts;
  }

  async findFinancialConceptByChurchIdAndFinancialConceptId(
    churchId: string,
    financialConceptId: string,
  ): Promise<FinancialConcept | undefined> {
    const collection = await this.collection();

    const aggregationPipeline = [
      {
        $match: {
          churchId: churchId,
          "financialConcepts.financeConceptId": financialConceptId,
        },
      },
      {
        $project: {
          _id: 1,
          financialConcepts: {
            $filter: {
              input: "$financialConcepts",
              as: "concept",
              cond: { $eq: ["$$concept.financeConceptId", financialConceptId] },
            },
          },
        },
      },
    ];

    const result = await collection.aggregate(aggregationPipeline).toArray();

    if (!result[0]) {
      return undefined;
    }

    return FinancialConcept.fromPrimitives(
      {
        id: result[0]._id.toString(),
        ...result[0].financialConcepts[0],
      },
      churchId,
    );
  }
}
