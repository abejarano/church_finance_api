import { Paginate } from "../../../../Shared/domain";
import { StorageAWS } from "../../../../Shared/infrastructure/StorageAWS";

export default async (list: Paginate<any>) => {
  const awsS3: StorageAWS = new StorageAWS(process.env.BUCKET_FILES);
  let results = [];

  for (const item of list.results) {
    results.push({
      contributionId: item.contributionId,
      amount: item.amount,
      status: item.status,
      createdAt: item.createdAt,
      bankTransferReceipt: await awsS3.downloadFile(item.bankTransferReceipt),
      type: item.type,
      member: {
        memberId: item.member.memberId,
        name: item.member.name,
        churchId: item.member.churchId,
      },
      financeConcept: {
        financialConceptId: item.financialConcept.financialConceptId,
        name: item.financialConcept.name,
      },
    });
  }

  return {
    count: list.totalRecord,
    nextPag: list.nextPag,
    results,
  };
};
