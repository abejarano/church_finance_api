import { District } from "./district";
import { v4 } from "uuid";
import { AggregateRoot } from "../../shared/domain/aggregate_root";

export class Region extends AggregateRoot {
  private id?: string;
  private regionId: string;
  private name: string;
  private district: District;

  static create(name: string, district: District): Region {
    const r: Region = new Region();
    r.name = name;
    r.district = district;
    r.regionId = v4();

    return r;
  }

  getId(): string {
    return this.id;
  }

  getRegionId(): string {
    return this.regionId;
  }
  getDistrict(): District {
    return this.district;
  }

  static fromPrimitives(plainData: any): Region {
    const r: Region = new Region();
    r.id = plainData.id;
    r.name = plainData.name;
    r.regionId = plainData.regionId;
    r.district = District.fromPrimitives(plainData.district);
    return r;
  }

  toPrimitives(): any {
    return {
      regionId: this.regionId,
      name: this.name,
      district: { id: this.district.getId(), ...this.district.toPrimitives() },
    };
  }
}
