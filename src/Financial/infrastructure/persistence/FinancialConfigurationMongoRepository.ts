import { MongoRepository } from "../../../Shared/infrastructure";
import { Bank, ConceptType, CostCenter, FinancialConcept } from "../../domain";
import { IFinancialConfigurationRepository } from "../../domain/interfaces";

export class FinancialConfigurationMongoRepository
  extends MongoRepository<any>
  implements IFinancialConfigurationRepository
{
  private static instance: FinancialConfigurationMongoRepository;

  constructor() {
    super();
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
    const collection = await this.collection<{
      banks: Bank[];
      churchId: string;
    }>();

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

    if (!("banks" in result)) {
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
      { $pull: { banks: { bankId: bank.getBankId() } } },
    );

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
      {
        $pull: {
          financialConcepts: {
            financialConceptId: concept.getfinancialConceptId(),
          },
        },
      },
    );

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
      {
        $pull: { costCenters: { costCenterId: costCenter.getCostCenterId() } },
      },
    );

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
    churchId: string,
  ): Promise<CostCenter> {
    const collection = await this.collection<{
      costCenters: CostCenter[];
      churchId: string;
    }>();
    const result = await collection.findOne(
      { "costCenters.costCenterId": costCenterId, churchId },
      { projection: { _id: 1, churchId: 1, costCenters: 1 } },
    );

    if (!result) {
      return undefined;
    }

    return CostCenter.fromPrimitives({
      churchId: result.churchId,
      ...result.costCenters[0],
    });
  }

  async findBankByBankId(bankId: string): Promise<Bank> {
    const collection = await this.collection<{
      banks: Bank[];
      churchId: string;
    }>();
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
    const collection = await this.collection<{
      costCenters: { bankId }[];
    }>();
    const result = await collection.findOne(
      { churchId },
      { projection: { _id: 1, costCenters: 1 } },
    );

    if (!result || !result.costCenters) {
      return [];
    }

    const listCostCenter: CostCenter[] = [];

    for (const costCenter of result.costCenters) {
      listCostCenter.push(
        CostCenter.fromPrimitives({ id: result._id.toString(), ...costCenter }),
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

    return this.buildFinancialConcept(result, churchId);
  }

  async findFinancialConceptsByChurchId(
    churchId: string,
  ): Promise<FinancialConcept[]> {
    const collection = await this.collection();

    const aggregationPipeline = [
      {
        $match: {
          churchId: churchId,
        },
      },
      {
        $project: {
          _id: 1,
          financialConcepts: 1,
        },
      },
    ];

    const result = await collection.aggregate(aggregationPipeline).toArray();

    if (!result) {
      return [];
    }

    return this.buildFinancialConcept(result, churchId);
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
          "financialConcepts.financialConceptId": financialConceptId,
        },
      },
      {
        $project: {
          _id: 1,
          financialConcepts: {
            $filter: {
              input: "$financialConcepts",
              as: "concept",
              cond: {
                $eq: ["$$concept.financialConceptId", financialConceptId],
              },
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

  private buildFinancialConcept(result, churchId) {
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
}
