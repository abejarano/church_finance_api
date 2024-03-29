import { IMinisterRepository, Minister } from "../../domain";

export class MinisterWithoutAssignedChurch {
  constructor(private readonly ministerRepository: IMinisterRepository) {}

  async execute(): Promise<Minister[]> {
    return this.ministerRepository.withoutAssignedChurch();
  }
}
