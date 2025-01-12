import { IDefinitionQueue } from "./Shared/domain";
import { CreateUserForMember } from "./SecuritySystem/applications";
import {
  PasswordAdapter,
  UserMongoRepository,
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
    useClass: CreateUserForMember,
    inject: [UserMongoRepository.getInstance(), new PasswordAdapter()],
  },
  {
    useClass: InitialLoadingFinancialConcepts,
    inject: [
      FinancialConfigurationMongoRepository.getInstance(),
      ChurchMongoRepository.getInstance(),
    ],
  },
];
