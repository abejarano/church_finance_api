import { Church, ChurchNotFound, IChurchRepository } from "../../domain";
import { ChurchRequest } from "../../infrastructure/http/requests/Church.request";

import {
  IRegionRepository,
  Region,
  RegionNotFound,
} from "../../../OrganizacionalStructure/domain";
import { IMessageBus } from "../../../Shared/domain";

export class CreateOrUpdateChurch {
  constructor(
    private readonly churchRepository: IChurchRepository,
    private readonly regionRepository: IRegionRepository,
    private readonly messageEvent: IMessageBus,
  ) {}

  async execute(churchRequest: ChurchRequest): Promise<void> {
    let church: Church;

    if (!churchRequest.churchId) {
      church = await this.create(churchRequest);

      await this.churchRepository.upsert(church);

      await this.messageEvent.transmissionMessage(
        JSON.stringify({
          churchId: church.getChurchId(),
        }),
        process.env.TOPIC_CHURCH_CREATED,
      );
      return;
    }

    church = await this.churchRepository.findById(churchRequest.churchId);
    if (!church) {
      throw new ChurchNotFound();
    }

    const region: Region = await this.getRegion(churchRequest.regionId);

    church.setRegion(region);
    church.setAddress(
      churchRequest.city,
      churchRequest.address,
      churchRequest.street,
      churchRequest.number,
      churchRequest.postalCode,
    );
    church.setEmail(churchRequest.email);
    church.setOpeningDate(churchRequest.openingDate);
    church.setRegisterNumber(churchRequest.registerNumber);

    await this.churchRepository.upsert(church);
  }

  private async getRegion(regionId: string): Promise<Region> {
    const region: Region = await this.regionRepository.findById(regionId);

    if (!region) {
      throw new RegionNotFound();
    }

    return region;
  }

  private async create(churchRequest: ChurchRequest): Promise<Church> {
    console.log(`Registrar iglesia ${JSON.stringify(churchRequest)}`);
    const region: Region = await this.getRegion(churchRequest.regionId);

    return Church.create(
      churchRequest.name,
      churchRequest.city,
      churchRequest.address,
      churchRequest.street,
      churchRequest.number,
      churchRequest.postalCode,
      churchRequest.email,
      churchRequest.openingDate,
      region,
      churchRequest.registerNumber,
    );
  }
}
