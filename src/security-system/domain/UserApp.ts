import { Member } from "../../church/domain";
import { IdentifyEntity } from "../../shared/adapter";
import { AggregateRoot } from "../../shared/domain";

export class UserApp extends AggregateRoot {
  private id?: string;
  private userId: string;
  private email: string;
  private password: string;
  private name: string;
  private memberId: string;
  private isTreasurer: boolean;
  private active: boolean;

  static create(member: Member, password: string) {
    const u = new UserApp();
    u.email = member.getEmail();
    u.password = password;
    u.name = member.getName();
    u.memberId = member.getMemberId();
    u.userId = IdentifyEntity.get();
    u.isTreasurer = member.isTreasurer;
    u.active = true;

    return u;
  }

  getId(): string {
    return this.id;
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

    return u;
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
    };
  }
}
