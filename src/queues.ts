import { IDefinitionQueue } from "./Shared/domain";
import { CreateUserApp } from "./SecuritySystem/applications";
import {
  PasswordAdapter,
  UserAppMongoRepository,
} from "./SecuritySystem/infrastructure";
import { MovementBankMongoRepository } from "./MovementBank/infraestructura/persistence";
import { MovementBankRecord } from "./MovementBank/applications";
import { InitialLoadingFinancialConcepts } from "./Financial/applications";
import {
  FinanceRecordMongoRepository,
  FinancialConfigurationMongoRepository,
} from "./Financial/infrastructure";
import { ChurchMongoRepository } from "./Church/infrastructure";
import { RegisterFinancialRecord } from "./Financial/applications/financeRecord/RegisterFinancialRecord";

export const Queues: IDefinitionQueue[] = [
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
    useClass: CreateUserApp,
    inject: [UserAppMongoRepository.getInstance(), new PasswordAdapter()],
  },
  {
    useClass: InitialLoadingFinancialConcepts,
    inject: [
      FinancialConfigurationMongoRepository.getInstance(),
      ChurchMongoRepository.getInstance(),
    ],
  },
];
