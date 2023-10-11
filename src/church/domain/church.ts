import { AggregateRoot, IdentifyEntity } from "../../shared";
import { Minister, Region } from "../../structure_organization";

export class Church extends AggregateRoot {
  private id?: string;
  private churchId: string;
  private name: string;
  private city: string;
  private address: string;
  private street: string;
  private number: string;
  private postalCode: string;
  private registerNumber: string;
  private email: string;
  private openingDate: Date;
  private minister: Minister;
  private region: Region;
  private createdAt: Date;

  static create(
    name: string,
    city: string,
    address: string,
    street: string,
    number: string,
    postalCode: string,
    registerNumber: string,
    email: string,
    openingDate: Date,
    minister: Minister,
    region: Region,
  ): Church {
    const c: Church = new Church();

    c.name = name;
    c.city = city;
    c.address = address;
    c.street = street;
    c.number = number;
    c.postalCode = postalCode;
    c.registerNumber = registerNumber;
    c.email = email;
    c.openingDate = openingDate;
    c.minister = minister;
    c.region = region;
    c.createdAt = new Date();
    c.churchId = IdentifyEntity.get();

    return c;
  }

  getId(): string {
    return this.id;
  }

  getChurchId(): string {
    return this.churchId;
  }

  static fromPrimitives(plainData: any): Church {
    const c: Church = new Church();
    c.id = plainData.id;
    c.churchId = plainData.churchId;
    c.name = plainData.name;
    c.city = plainData.city;
    c.address = plainData.address;
    c.street = plainData.street;
    c.number = plainData.number;
    c.postalCode = plainData.postalCode;
    c.registerNumber = plainData.registerNumber;
    c.email = plainData.email;
    c.openingDate = plainData.openingDate;
    c.minister = Minister.fromPrimitives(plainData.minister);
    c.region = Region.fromPrimitives(plainData.region);
    c.createdAt = plainData.createdAt;
    return c;
  }

  getMinister() {
    return this.minister;
  }

  getRegion(): Region {
    return this.region;
  }

  toPrimitives(): any {
    return {
      churchId: this.churchId,
      name: this.name,
      city: this.city,
      address: this.address,
      street: this.street,
      number: this.number,
      postalCode: this.postalCode,
      registerNumber: this.registerNumber,
      email: this.email,
      openingDate: this.openingDate,
      minister: { id: this.minister.getId(), ...this.minister.toPrimitives() },
      region: { ...this.region.toPrimitives() },
      createdAt: this.createdAt,
    };
  }
}
