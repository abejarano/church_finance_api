import {
  MongoClientFactory,
  MongoRepository,
} from "../../../Shared/infrastructure";
import { IMovementBankRepository, MovementBank } from "../../domain";

export class MovementBankMongoRepository
  extends MongoRepository<MovementBank>
  implements IMovementBankRepository
{
  private static instance: MovementBankMongoRepository;

  constructor() {
    super(MongoClientFactory.createClient());
  }

  static getInstance(): MovementBankMongoRepository {
    if (!MovementBankMongoRepository.instance) {
      MovementBankMongoRepository.instance = new MovementBankMongoRepository();
    }
    return MovementBankMongoRepository.instance;
  }

  upsert(movementBank: MovementBank): Promise<void> {
    throw new Error("Method not implemented.");
  }

  collectionName(): string {
    return "movement_bank";
  }
}
