import { IMinisterRepository } from "../../../OrganizacionalStructure/domain";
import { IChurchRepository } from "../../domain";
import { GenericException } from "../../../Shared/domain";

export class RemoveMinister {
  constructor(
    private readonly ministerRepository: IMinisterRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async execute(churchId: string) {
    const church = await this.churchRepository.findById(churchId);

    if (!church.getMinisterId()) {
      throw new GenericException(
        "This church does not have an assigned minister",
      );
    }

    const minister = await this.ministerRepository.findById(
      church.getMinisterId(),
    );

    minister.removeChurch();

    church.removeMinister();

    await this.ministerRepository.upsert(minister);
    await this.churchRepository.upsert(church);
  }
}
