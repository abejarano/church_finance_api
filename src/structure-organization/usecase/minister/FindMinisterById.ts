import { IMinisterRepository, Minister } from "../../domain";
import { MinisterNotFound } from "../../domain/exceptions/MinisterNotFound.exception";
import { logger } from "../../../shared";
`{`;
export class FindMinisterById {
  constructor(private readonly ministerRepository: IMinisterRepository) {}
  async execute(ministerId: string): Promise<Minister> {
    logger.info(`Buscando un ministro por el id el: ${ministerId}`);

    const minister: Minister =
      await this.ministerRepository.findById(ministerId);

    if (!minister) {
      throw new MinisterNotFound();
    }

    return minister;
  }
}
