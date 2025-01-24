import { IDefinitionQueue } from './Shared/domain'
import { CreateUserForMember } from './SecuritySystem/applications'
import {
  PasswordAdapter,
  UserMongoRepository,
} from './SecuritySystem/infrastructure'
import { InitialLoadingFinancialConcepts } from './Financial/applications'
import { FinancialConfigurationMongoRepository } from './Financial/infrastructure'
import { ChurchMongoRepository } from './Church/infrastructure'
import { FinancialQueue } from './Financial/infrastructure/financal.queue'

export const Queues: IDefinitionQueue[] = [
  ...FinancialQueue,
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
]
