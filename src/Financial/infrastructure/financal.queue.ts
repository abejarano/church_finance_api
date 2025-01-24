import { IDefinitionQueue } from "../../Shared/domain";
import { MovementBankRecord } from "../../MovementBank/applications";
import { MovementBankMongoRepository } from "../../MovementBank/infraestructura/persistence";
import {
  AvailabilityAccountMasterMongoRepository,
  AvailabilityAccountMongoRepository,
  CostCenterMasterMongoRepository,
  FinanceRecordMongoRepository,
  FinancialConfigurationMongoRepository,
} from "./persistence";
import { RegisterFinancialRecord } from "../applications/financeRecord/RegisterFinancialRecord";
import { UpdateAvailabilityAccountBalance } from "../applications";
import { UpdateCostCenterMaster } from "../applications/costCenter/UpdateCostCenterMaster";

export const FinancialQueue: IDefinitionQueue[] = [
  {
    useClass: UpdateCostCenterMaster,
    inject: [
      FinancialConfigurationMongoRepository.getInstance(),
      CostCenterMasterMongoRepository.getInstance(),
    ],
  },
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
      AvailabilityAccountMongoRepository.getInstance(),
    ],
  },
  {
    useClass: UpdateAvailabilityAccountBalance,
    inject: [
      AvailabilityAccountMongoRepository.getInstance(),
      AvailabilityAccountMasterMongoRepository.getInstance(),
    ],
  },
];
