import {
  MongoClientFactory,
  MongoRepository,
} from "../../../Shared/infrastructure";
import { FinanceRecord } from "../../domain/FinanceRecord";
import { IFinancialRecordRepository } from "../../domain/interfaces";
import { plainToInstance } from "class-transformer";
import { Criteria, Paginate } from "../../../Shared/domain";
import { FinanceRecordDTO } from "../http/dto/FinanceRecord.dto";
import { IFinanceRecordDTO } from "../../domain";

export class FinanceRecordMongoRepository
  extends MongoRepository<FinanceRecord>
  implements IFinancialRecordRepository
{
  private static instance: FinanceRecordMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  static getInstance(): FinanceRecordMongoRepository {
    if (!FinanceRecordMongoRepository.instance) {
      FinanceRecordMongoRepository.instance =
        new FinanceRecordMongoRepository();
    }
    return FinanceRecordMongoRepository.instance;
  }

  collectionName(): string {
    return "financial_records";
  }

  async list(criteria: Criteria): Promise<Paginate<IFinanceRecordDTO>> {
    const result: FinanceRecordDTO[] =
      await this.searchByCriteria<FinanceRecordDTO>(criteria);

    const dto = plainToInstance(FinanceRecordDTO, result, {
      excludeExtraneousValues: true,
    });

    return this.buildPaginate<FinanceRecordDTO>(dto);
  }

  async upsert(financialRecord: FinanceRecord): Promise<void> {
    await this.persist(financialRecord.getId(), financialRecord);
  }
}
