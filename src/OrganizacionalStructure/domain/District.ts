import { AggregateRoot } from "../../Shared/domain";
import { States } from "../../World/domain";
import { IdentifyEntity } from "../../Shared/adapter";

export class District extends AggregateRoot {
  private id?: string;
  private districtId: string;
  private name: string;
  private stateId: string;
  private createdAt: Date;

  static create(name: string, state: States): District {
    const d: District = new District();
    d.name = name;
    d.stateId = state.getStateId();
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

  setName(name: string): District {
    this.name = name;
    return this;
  }

  setState(state: States): District {
    this.stateId = state.getStateId();
    return this;
  }

  static fromPrimitives(plainData: any): District {
    const d: District = new District();
    d.id = plainData.id;
    d.name = plainData.name;
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
      stateId: this.stateId,
      createdAt: this.createdAt,
    };
  }
}
