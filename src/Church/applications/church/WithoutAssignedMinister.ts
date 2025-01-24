import { Church, IChurchRepository } from "../../domain"

export class WithoutAssignedMinister {
  constructor(private readonly churchRepository: IChurchRepository) {}

  async execute(): Promise<Church[]> {
    return this.churchRepository.withoutAssignedMinister()
  }
}
