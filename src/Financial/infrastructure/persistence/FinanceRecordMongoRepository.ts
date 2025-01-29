import { MongoRepository } from "../../../Shared/infrastructure"
import { FinanceRecord } from "../../domain/FinanceRecord"
import { IFinancialRecordRepository } from "../../domain/interfaces"
import { Criteria, Paginate } from "../../../Shared/domain"
import { ConceptType } from "../../domain"

export class FinanceRecordMongoRepository
  extends MongoRepository<FinanceRecord>
  implements IFinancialRecordRepository
{
  private static instance: FinanceRecordMongoRepository

  constructor() {
    super()
  }

  static getInstance(): FinanceRecordMongoRepository {
    if (!FinanceRecordMongoRepository.instance) {
      FinanceRecordMongoRepository.instance = new FinanceRecordMongoRepository()
    }
    return FinanceRecordMongoRepository.instance
  }

  collectionName(): string {
    return "financial_records"
  }

  async fetch(criteria: Criteria): Promise<Paginate<FinanceRecord>> {
    const result: FinanceRecord[] =
      await this.searchByCriteria<FinanceRecord>(criteria)

    return this.buildPaginate<FinanceRecord>(result)
  }

  async upsert(financialRecord: FinanceRecord): Promise<void> {
    await this.persist(financialRecord.getId(), financialRecord)
  }

  async titheList(filter: {
    churchId: string
    year: number
    month: number
  }): Promise<{ total: number; tithesOfTithes: number; records: any[] }> {
    const { churchId, year, month } = filter

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 1)

    const filters = {
      churchId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
      "financialConcept.name": { $regex: "Dízimos" },
      type: ConceptType.INCOME,
    }

    const collection = await this.collection()

    const result = await collection
      .aggregate([
        {
          $match: filters,
        },
        {
          $group: {
            _id: null, // No queremos agrupar por un campo específico
            total: { $sum: "$amount" }, // Sumamos el campo "amount"
            records: {
              $push: {
                amount: "$amount",
                date: "$date",
                availabilityAccountName: "$availabilityAccount.accountName",
                availabilityAccountType: "$availabilityAccount.type",
              },
            },
          },
        },
      ])
      .toArray()

    if (result.length === 0) {
      return { total: 0, tithesOfTithes: 0, records: [] }
    }

    return {
      total: result[0].total,
      records: result[0].records,
      tithesOfTithes: ((result[0].total ?? 0) * 10) / 100,
    }
  }
}
