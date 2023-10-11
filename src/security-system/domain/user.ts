import { Profile } from "./profile";
import { AggregateRoot } from "../../shared";

export class User extends AggregateRoot {
  private userId: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private active: boolean;
  private profile: Profile;

  getPassword(): string {
    return this.password;
  }

  getEmail(): string {
    return this.email;
  }

  setUpdatePassword(newPass: string): User {
    this.password = newPass;
    return this;
  }

  isActive(): boolean {
    return this.active;
  }

  activateUser(): User {
    this.active = true;
    return this;
  }

  static fromPrimitives(id: string, data: any): User {
    const u: User = new User();
    u.email = data.email;
    u.createdAt = data.createdAt;
    u.active = data.active;

    u.password = data.password;
    u.userId = data.userId;

    return u;
  }

  toPrimitives(): any {
    return {
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      active: this.active,
      profile: this.profile.toPrimitives(),
      userId: this.userId,
    };
  }

  getId(): string {
    return "";
  }
}
