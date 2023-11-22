import { IMinisterRepository } from "../../domain";
import { Church } from "../../../church/domain";

export class AssignChurch {
  constructor(private readonly ministerRepository: IMinisterRepository) {}

  async execute(church: Church): Promise<void> {
    await this.ministerRepository.assignChurch(church);
  }
}
