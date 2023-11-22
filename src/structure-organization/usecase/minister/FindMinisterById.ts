import { IMinisterRepository, Minister } from "../../domain";
import { MinisterNotFound } from "../../domain/exceptions/MinisterNotFound.exception";

export class FindMinisterById {
  constructor(private readonly ministerRepository: IMinisterRepository) {}
  async execute(minsiterId: string): Promise<Minister> {
    const minister: Minister =
      await this.ministerRepository.findById(minsiterId);
    if (!minister) {
      throw new MinisterNotFound();
    }

    return minister;
  }
}
