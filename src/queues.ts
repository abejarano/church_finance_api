import { IDefinitionQueue } from "./Shared/domain";
import { CreateUserApp } from "./SecuritySystem/applications";
import {
  PasswordAdapter,
  UserAppMongoRepository,
} from "./SecuritySystem/infrastructure";
import { MovementBankMongoRepository } from "./MovementBank/infraestructura/persistence";
import { MovementBankRecord } from "./MovementBank/applications";
import { InitialLoadingFinancialConcepts } from "./Financial/applications";
import { FinancialConfigurationMongoRepository } from "./Financial/infrastructure";
import { ChurchMongoRepository } from "./Church/infrastructure";

export const Queues: IDefinitionQueue[] = [
  {
    useClass: MovementBankRecord,
    inject: [MovementBankMongoRepository.getInstance()],
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
