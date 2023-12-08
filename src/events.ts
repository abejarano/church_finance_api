import { NativeEventBus } from "./shared/infrastructure/eventBus/NativeEventBus";
import { FinancialConfigurationMongoRepository } from "./financial/infrastructure/persistence/FinancialConfigurationMongoRepository";
import { ChurchMongoRepository } from "./church/infrastructure";
import { CreateUserApp } from "./security-system/applications/CreateUserApp";
import { InitialLoadingFinancialConcepts } from "./financial/applications";
import {
  PasswordAdapter,
  UserAppMongoRepository,
} from "./security-system/infrastructure";
import { Member } from "./church/domain";
import * as console from "console";

NativeEventBus.getInstance().subscribe(
  process.env.TOPIC_CHURCH_CREATED,
  async (data: any) => {
    await new InitialLoadingFinancialConcepts(
      FinancialConfigurationMongoRepository.getInstance(),
      ChurchMongoRepository.getInstance(),
    ).execute(data.churchId);
  },
);

NativeEventBus.getInstance().subscribe(
  process.env.TOPIC_CREATE_USRE_APP,
  async (data: any) => {
    try {
      const member = Member.fromPrimitives({ ...data, id: data.id });

      await new CreateUserApp(
        UserAppMongoRepository.getInstance(),
        new PasswordAdapter(),
      ).execute(member);
    } catch (e) {
      console.error(e);
    }
  },
);
