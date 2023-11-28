import { NativeEventBus } from "./shared/infrastructure/eventBus/NativeEventBus";
import { InitialLoadingFinancialConcepts } from "./financial/applications/financialConfiguration/InitialLoadingFinancialConcepts";
import { FinancialConfigurationMongoRepository } from "./financial/infrastructure/persistence/FinancialConfigurationMongoRepository";
import { ChurchMongoRepository } from "./church/infrastructure";

NativeEventBus.getInstance().subscribe(
  process.env.TOPIC_CHURCH_CREATED,
  async (data: any) => {
    await new InitialLoadingFinancialConcepts(
      FinancialConfigurationMongoRepository.getInstance(),
      ChurchMongoRepository.getInstance(),
    ).execute(data.churchId);
  },
);
