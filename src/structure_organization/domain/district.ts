import { AggregateRoot, IdentifyEntity } from "../../shared";

export class District extends AggregateRoot {
  private id?: string;
  private districtId: string;
  private name: string;
  private registerName: string;
  private stateId: string;
  private createdAt: Date;

  static create(
    name: string,
    registerName: string,
    countryId: string,
    stateId: string,
  ): District {
    const d: District = new District();
    d.name = name;
    d.registerName = registerName;
    d.stateId = countryId;
    d.stateId = stateId;
    d.districtId = IdentifyEntity.get();
    d.createdAt = new Date();
    return d;
  }

  getId(): string {
    return this.id;
  }

  getDistrictId(): string {
    return this.districtId;
  }

  static fromPrimitives(plainData: any): District {
    const d: District = new District();
    d.id = plainData.id;
    d.name = plainData.name;
    d.registerName = plainData.registerName;
    d.stateId = plainData.stateId;
    d.stateId = plainData.stateId;
    d.districtId = plainData.districtId;
    d.createdAt = plainData.createdAt;
    return d;
  }

  toPrimitives() {
    return {
      districtId: this.districtId,
      name: this.name,
      registerName: this.registerName,
      countryId: this.stateId,
      stateId: this.stateId,
      createdAt: this.createdAt,
    };
  }
}
