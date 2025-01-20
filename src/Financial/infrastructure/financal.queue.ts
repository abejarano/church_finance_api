import { IDefinitionQueue } from "../../Shared/domain";
import { MovementBankRecord } from "../../MovementBank/applications";
import { MovementBankMongoRepository } from "../../MovementBank/infraestructura/persistence";
import {
  AvailabilityAccountMasterMongoRepository,
  FinanceRecordMongoRepository,
  FinancialConfigurationMongoRepository,
} from "./persistence";
import { RegisterFinancialRecord } from "../applications/financeRecord/RegisterFinancialRecord";
import { UpdateAvailabilityAccountBalance } from "../applications";

export const FinancialQueue: IDefinitionQueue[] = [
  {
    useClass: MovementBankRecord,
    inject: [
      MovementBankMongoRepository.getInstance(),
      FinancialConfigurationMongoRepository.getInstance(),
    ],
  },
  {
    useClass: RegisterFinancialRecord,
    inject: [
      FinancialConfigurationMongoRepository.getInstance(),
      FinanceRecordMongoRepository.getInstance(),
      FinancialConfigurationMongoRepository.getInstance(),
    ],
  },
  {
    useClass: UpdateAvailabilityAccountBalance,
    inject: [
      FinancialConfigurationMongoRepository.getInstance(),
      AvailabilityAccountMasterMongoRepository.getInstance(),
    ],
  },
];
