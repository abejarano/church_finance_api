import { IRegionRepository } from "../domain";

export class RegisterOrRegion {
  constructor(private readonly regionRepository: IRegionRepository) {}

  async execute() {}
}
