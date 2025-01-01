import {
  MongoClientFactory,
  MongoRepository,
} from "../../../Shared/infrastructure";
import { FinancialRecord } from "../../domain/FinancialRecord";
import { IFinancialRecordRepository } from "../../domain/interfaces";

export class FinancialRecordMongoRepository
  extends MongoRepository<FinancialRecord>
  implements IFinancialRecordRepository
{
  private static instance: FinancialRecordMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  static getInstance(): FinancialRecordMongoRepository {
    if (!FinancialRecordMongoRepository.instance) {
      FinancialRecordMongoRepository.instance =
        new FinancialRecordMongoRepository();
    }
    return FinancialRecordMongoRepository.instance;
  }

  collectionName(): string {
    return "financial_records";
  }

  async upsert(financialRecord: FinancialRecord): Promise<void> {
    await this.persist(financialRecord.getId(), financialRecord);
  }
}
