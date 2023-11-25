import { Church, ChurchNotFound, IChurchRepository } from "../../domain";
import { logger } from "../../../shared";

export class FindChurchById {
  constructor(private readonly churchRepository: IChurchRepository) {}

  async execute(churchId: string): Promise<Church> {
    logger.info(`Buscar iglesia por el id: ${churchId}`);

    const church: Church = await this.churchRepository.findById(churchId);
    if (!church) {
      throw new ChurchNotFound();
    }

    return church;
  }
}
