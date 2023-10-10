import { v4 } from "uuid";
import { AggregateRoot } from "../../shared/domain/aggregate_root";

export class District extends AggregateRoot {
  private id?: string;
  private districtId: string;
  private name: string;
  private registerName: string;
  private countryId: string;
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
    d.countryId = countryId;

    d.stateId = stateId;
    d.districtId = v4();
    d.createdAt = new Date();
    return d;
  }

  getId(): string {
    return this.id;
  }

  getDistrictId(): string {
    return this.districtId;
  }

  static fromPrimitives(district: any): District {
    const d: District = new District();
    d.id = district.id;
    d.name = district.name;
    d.registerName = district.registerName;
    d.countryId = district.countryId;
    d.stateId = district.stateId;
    d.districtId = district.districtId;
    d.createdAt = district.createdAt;
    return d;
  }

  toPrimitives() {
    return {
      districtId: this.districtId,
      name: this.name,
      registerName: this.registerName,
      countryId: this.countryId,
      stateId: this.stateId,
      createdAt: this.createdAt,
    };
  }
}
