import { Member } from "../../church/domain";
import { PasswordValueObject } from "../../shared/adapter/password-value-object";
import { AggregateRoot, IdentifyEntity } from "../../shared";

export class UserApp extends AggregateRoot {
  private id?: string;
  private userId: string;
  private email: string;
  private password: string;
  private name: string;
  private memberId: string;
  static create(member: Member) {
    const u = new UserApp();
    u.email = member.getEmail();
    u.password = new PasswordValueObject(member.getDni()).getValue();
    u.name = member.getName();
    u.memberId = member.getMemberId();
    u.userId = IdentifyEntity.get();

    return u;
  }

  getId(): string {
    return this.id;
  }

  toPrimitives(): any {
    return {
      email: this.email,
      password: this.password,
      name: this.name,
      memberId: this.memberId,
      userId: this.userId,
    };
  }
}
