import { AggregateRoot } from "../../Shared/domain";
import { IdentifyEntity } from "../../Shared/adapter";
import { DateBR } from "../../Shared/helpers";
import { Profile } from "./types/profile.type";

export class User extends AggregateRoot {
  isActive: boolean;
  private id?: string;
  private userId: string;
  private email: string;
  private name: string;
  private password: string;
  private createdAt: Date;
  private profiles: Profile[];
  private churchId: string;

  static create(
    name: string,
    email: string,
    password: string,
    profiles: Profile[],
    churchId: string,
  ): User {
    const u = new User();
    u.email = email;
    u.password = password;

    u.churchId = churchId;

    u.userId = IdentifyEntity.get();

    u.profiles = profiles;

    u.createdAt = DateBR();
    u.isActive = true;
    u.name = name;

    return u;
  }

  static fromPrimitives(data: any): User {
    const u: User = new User();
    u.email = data.email;
    u.createdAt = data.createdAt;
    u.isActive = data.isActive;
    u.id = data.id;
    u.password = data.password;
    u.userId = data.userId;
    u.churchId = data.churchId;
    u.name = data.name;
    u.profiles = data.profiles;

    return u;
  }

  getProfiles() {
    return this.profiles;
  }

  getChurchId(): string {
    return this.churchId;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  // getProfileId(): string[] {
  //   return this.profileId;
  // }

  getPassword(): string {
    return this.password;
  }

  getEmail(): string {
    return this.email;
  }

  getUserId(): string {
    return this.userId;
  }

  deleteAllProfile(): User {
    this.profiles = [];
    return this;
  }

  setProfile(profile: Profile[]): User {
    profile.forEach((p) => {
      this.profiles.push(p);
    });
    return this;
  }

  setEmail(email: string): User {
    this.email = email;
    return this;
  }

  // superUser(): boolean {
  //   return this.isSuperuser;
  // }

  // setSuperuser(): User {
  //   this.isSuperuser = true;
  //   return this;
  // }

  // unsetSuperuser(): User {
  //   this.isSuperuser = false;
  //   return this;
  // }

  setUpdatePassword(newPass: string): User {
    this.password = newPass;
    return this;
  }

  enable(): User {
    this.isActive = true;
    return this;
  }

  disable(): User {
    this.isActive = false;
    return this;
  }

  toPrimitives(): any {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      isActive: this.isActive,
      profiles: this.profiles,
      userId: this.userId,
      churchId: this.churchId,
    };
  }
}
