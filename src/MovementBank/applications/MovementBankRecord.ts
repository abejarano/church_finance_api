import { IMovementBankRepository, MovementBank } from "../domain";
import { IQueue } from "../../Shared/domain";

export class MovementBankRecord implements IQueue {
  name: string = "MovementBankRecord";

  constructor(
    private readonly movementBankRepository: IMovementBankRepository,
  ) {}

  async handle(content: any): Promise<void> {
    const movementBank = MovementBank.create(
      content.amount,
      content.movementType,
      content.description,
      content.bank,
    );

    await this.movementBankRepository.upsert(movementBank);
  }
}
