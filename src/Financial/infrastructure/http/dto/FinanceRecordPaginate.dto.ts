import { Paginate } from '../../../../Shared/domain'
import { StorageGCP } from '../../../../Shared/infrastructure'

export default async (list: Paginate<any>) => {
  const storage: StorageGCP = StorageGCP.getInstance(process.env.BUCKET_FILES)
  let results = []

  for (const item of list.results) {
    if (item.voucher) {
      item.voucher = await storage.downloadFile(item.voucher)
    }

    results.push({
      financialConcept: item.financialConcept,
      financialRecordId: item.financialRecordId,
      churchId: item.churchId,
      amount: item.amount,
      date: item.date,
      type: item.type,
      voucher: item.voucher,
      availabilityAccount: item.availabilityAccount,
      description: item.description,
    })
  }

  return {
    count: list.count,
    nextPag: list.nextPag,
    results,
  }
}
