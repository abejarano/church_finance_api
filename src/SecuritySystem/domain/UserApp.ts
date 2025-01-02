import { Member } from "../../Church/domain";
import { IdentifyEntity } from "../../Shared/adapter";
import { AggregateRoot } from "../../Shared/domain";
import { DateBR } from "../../Shared/helpers";

export class UserApp extends AggregateRoot {
  isTreasurer: boolean;
  isMinister: boolean;
  private id?: string;
  private userId: string;
  private email: string;
  private password: string;
  private name: string;
  private memberId: string;
  private active: boolean;
  private churchId: string;
  private createdAt: Date;

  static create(member: Member, password: string) {
    const u = new UserApp();
    u.email = member.getEmail();
    u.password = password;
    u.name = member.getName();
    u.memberId = member.getMemberId();
    u.userId = IdentifyEntity.get();
    u.isTreasurer = member.isTreasurer;
    u.isMinister = member.isMinister;
    u.active = true;
    u.churchId = member.getChurchId();
    u.createdAt = DateBR();

    return u;
  }

  static fromPrimitives(plainData: any): UserApp {
    const u = new UserApp();
    u.id = plainData.id;
    u.email = plainData.email;
    u.password = plainData.password;
    u.name = plainData.name;
    u.memberId = plainData.memberId;
    u.userId = plainData.userId;
    u.isTreasurer = plainData.isTreasurer;
    u.active = plainData.active;
    u.churchId = plainData.churchId;
    u.createdAt = plainData.createdAt;
    u.isMinister = plainData.isMinister;

    return u;
  }

  getId(): string {
    return this.id;
  }

  getMemberId(): string {
    return this.memberId;
  }

  getPassword(): string {
    return this.password;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getChurchId() {
    return this.churchId;
  }

  toPrimitives(): any {
    return {
      email: this.email,
      password: this.password,
      name: this.name,
      memberId: this.memberId,
      userId: this.userId,
      isTreasurer: this.isTreasurer,
      active: this.active,
      churchId: this.churchId,
      createdAt: this.createdAt,
      isMinister: this.isMinister,
    };
  }
}
