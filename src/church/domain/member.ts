import { Church } from "./church";
import { IdentifyEntity } from "../../shared";

export class Member {
  private id?: string;
  private memberId: string;
  private name: string;
  private email: string;
  private phone: string;
  private createdAt: Date;
  private dni: string;
  private conversionDate: Date;
  private baptismDate?: Date;
  private church: Church;
  private birthdate: Date;

  static create(
    name: string,
    phone: string,
    dni: string,
    church: Church,
    birthdate: Date,
    email: string,
    conversionDate: Date,
    baptismDate?: Date,
  ): Member {
    const m: Member = new Member();
    m.name = name;
    m.email = email;
    m.phone = phone;
    m.createdAt = new Date();
    m.dni = dni;
    m.conversionDate = conversionDate;
    m.baptismDate = baptismDate;
    m.church = church;
    m.birthdate = birthdate;
    m.memberId = IdentifyEntity.get();

    return m;
  }

  static fromPrimitives(plainData: any): Member {
    const m: Member = new Member();
    m.memberId = plainData.memberId;
    m.name = plainData.name;
    m.email = plainData.email;
    m.phone = plainData.phone;
    m.createdAt = plainData.createdAt;
    m.dni = plainData.dni;
    m.conversionDate = plainData.conversionDate;
    m.baptismDate = plainData.baptismDate;
    m.birthdate = plainData.birthdate;
    m.id = plainData.id;

    return m;
  }

  getId() {
    return this.id;
  }

  getChurchId(): string {
    return this.church.getChurchId();
  }

  getEmail(): string {
    return this.email;
  }

  getDni(): string {
    return this.dni;
  }

  getName(): string {
    return this.name;
  }

  getMemberId(): string {
    return this.memberId;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  setDni(dni: string) {
    this.dni = dni;
  }

  setConversionDate(conversionDate: Date) {
    this.conversionDate = conversionDate;
  }

  setBaptismDate(baptismDate: Date) {
    this.baptismDate = baptismDate;
  }

  setBirthdate(birthdate: Date) {
    this.birthdate = birthdate;
  }

  setName(name: string) {
    this.name = name;
  }

  toPrimitives(): any {
    return {
      memberId: this.memberId,
      name: this.name,
      email: this.email,
      phone: this.phone,
      createdAt: this.createdAt,
      dni: this.dni,
      conversionDate: this.conversionDate,
      baptismDate: this.baptismDate,
      birthdate: this.birthdate,
    };
  }
}
