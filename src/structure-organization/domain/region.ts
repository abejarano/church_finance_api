import { District } from "./district";
import { IdentifyEntity } from "../../shared";

export class Region {
  private regionId: string;
  private name: string;
  private district: District;

  static create(name: string, district: District): Region {
    const r: Region = new Region();
    r.name = name;
    r.district = district;
    r.regionId = IdentifyEntity.get();

    return r;
  }

  getRegionId(): string {
    return this.regionId;
  }

  getDistrict(): District {
    return this.district;
  }

  static fromPrimitives(plainData: any): Region {
    const r: Region = new Region();
    r.name = plainData.name;
    r.regionId = plainData.regionId;
    r.district = District.fromPrimitives(plainData.district);
    return r;
  }
  setName(name: string): void {
    this.name = name;
  }

  toPrimitives(): any {
    return {
      regionId: this.regionId,
      name: this.name,
    };
  }
}
