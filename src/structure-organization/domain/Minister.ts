import { Region } from "./Region";
import { AggregateRoot } from "../../shared/domain";
import { IdentifyEntity } from "../../shared/adapter";
import { MinisterType } from "./enums/minister-type.enum";

export class Minister extends AggregateRoot {
  private id?: string;
  private ministerId: string;
  private name: string;
  private email: string;
  private phone: string;
  private createdAt: Date;
  private dni: string;
  private ministerType: MinisterType;
  private region: Region;

  static create(
    name: string,
    email: string,
    phone: string,
    dni: string,
    ministerType: MinisterType,
    region: Region,
  ): Minister {
    const m: Minister = new Minister();
    m.name = name;
    m.email = email;
    m.phone = phone;
    m.createdAt = new Date();
    m.dni = dni;
    m.ministerType = ministerType;
    m.region = region;
    m.ministerId = IdentifyEntity.get();

    return m;
  }

  static fromPrimitives(plainData: any): Minister {
    const m: Minister = new Minister();
    m.id = plainData.id;
    m.name = plainData.name;
    m.email = plainData.email;
    m.phone = plainData.phone;
    m.createdAt = plainData.createdAt;
    m.dni = plainData.dni;
    m.ministerType = plainData.ministerType;
    m.region = Region.fromPrimitives(plainData.region);
    m.ministerId = plainData.ministerId;

    return m;
  }

  getRegion() {
    return this.region;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  setName(name: string) {
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  setRegion(region: Region) {
    this.region = region;
  }

  toPrimitives(): any {
    return {
      ministerId: this.ministerId,
      name: this.name,
      email: this.email,
      phone: this.phone,
      createdAt: this.createdAt,
      dni: this.dni,
      ministerType: this.ministerType,
      region: this.region,
    };
  }
}
