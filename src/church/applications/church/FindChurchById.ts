import { Church, ChurchNotFound, IChurchRepository } from "../../domain";

export class FindChurchById {
  constructor(private readonly churchRepository: IChurchRepository) {}

  async execute(churchId: string): Promise<Church> {
    const church: Church = await this.churchRepository.findById(churchId);
    if (!church) {
      throw new ChurchNotFound();
    }

    return church;
  }
}
