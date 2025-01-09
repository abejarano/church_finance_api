import { HttpStatus, QueueName } from "../../../../Shared/domain";
import domainResponse from "../../../../Shared/helpers/domainResponse";
import { FinancialRecordRequest } from "../../../domain";
import { RegisterFinancialRecord } from "../../../applications/financeRecord/RegisterFinancialRecord";
import {
  QueueBullService,
  StorageGCP,
} from "../../../../Shared/infrastructure";
import { FinancialYearMongoRepository } from "../../../../ConsolidatedFinancial/infrastructure";
import {
  FinanceRecordMongoRepository,
  FinancialConfigurationMongoRepository,
} from "../../persistence";
import {
  MovementBankRequest,
  TypeBankingOperation,
} from "../../../../MovementBank/domain";
import { FindFinancialConceptByChurchIdAndFinancialConceptId } from "../../../applications";

export const FinancialRecordController = async (
  request: FinancialRecordRequest,
  res,
) => {
  try {
    if (request.file) {
      request.voucher = await StorageGCP.getInstance(
        process.env.BUCKET_FILES,
      ).uploadFile(request.file);
    }

    const financialConcept =
      await new FindFinancialConceptByChurchIdAndFinancialConceptId(
        FinancialConfigurationMongoRepository.getInstance(),
      ).execute(request.churchId, request.financialConceptId);

    await new RegisterFinancialRecord(
      FinancialYearMongoRepository.getInstance(),
      FinanceRecordMongoRepository.getInstance(),
      FinancialConfigurationMongoRepository.getInstance(),
    ).handle(request, financialConcept);

    const movementBank: MovementBankRequest = {
      amount: request.amount,
      bankingOperation: TypeBankingOperation.DEPOSIT,
      concept: financialConcept.getName(),
      bankId: request.bankId,
    };

    QueueBullService.getInstance().dispatch(
      QueueName.MovementBankRecord,
      movementBank,
    );

    res
      .status(HttpStatus.CREATED)
      .send({ message: "successful financial record registration" });
  } catch (e) {
    if (request.voucher) {
      await StorageGCP.getInstance(process.env.BUCKET_FILES).deleteFile(
        request.voucher,
      );
    }

    return domainResponse(e, res);
  }
};
