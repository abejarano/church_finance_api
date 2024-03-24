import { NativeEventBus } from "./Shared/infrastructure/eventBus/NativeEventBus";
import { FinancialConfigurationMongoRepository } from "./Financial/infrastructure/persistence/FinancialConfigurationMongoRepository";
import { ChurchMongoRepository } from "./Church/infrastructure";
import { CreateUserApp } from "./SecuritySystem/applications/CreateUserApp";
import { InitialLoadingFinancialConcepts } from "./Financial/applications";
import {
  PasswordAdapter,
  UserAppMongoRepository,
} from "./SecuritySystem/infrastructure";
import { Member } from "./Church/domain";
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
