import { Profile } from "./Profile";
import { AggregateRoot } from "../../shared/domain";
import { IdentifyEntity } from "../../shared/adapter";

export class User extends AggregateRoot {
  private id?: string;
  private userId: string;
  private email: string;
  private name: string;
  private password: string;
  private createdAt: Date;
  isActive: boolean;
  private profileId: string[];
  private isSuperuser: boolean;

  static create(
    name: string,
    email: string,
    password: string,
    isSuperuser: boolean,
    profiles: Profile[],
  ): User {
    const u = new User();
    u.email = email;
    u.password = password;

    for (const profile of profiles) {
      if (!u.profileId) u.profileId = [profile.getProfileId()];
      else u.profileId.push(profile.getProfileId());
    }

    u.userId = IdentifyEntity.get();

    u.createdAt = new Date();
    u.isActive = true;
    u.name = name;
    u.isSuperuser = isSuperuser;

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
    u.profileId = data.profileId;

    u.isSuperuser = data.isSuperuser;
    u.name = data.name;

    return u;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getProfileId(): string[] {
    return this.profileId;
  }

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
    this.profileId = [];
    return this;
  }

  setProfile(profile: Profile): User {
    this.profileId.push(profile.getProfileId());
    return this;
  }

  setEmail(email: string): User {
    this.email = email;
    return this;
  }

  superUser(): boolean {
    return this.isSuperuser;
  }

  setSuperuser(): User {
    this.isSuperuser = true;
    return this;
  }

  unsetSuperuser(): User {
    this.isSuperuser = false;
    return this;
  }

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
      profileId: this.profileId,
      userId: this.userId,
      isSuperuser: this.isSuperuser,
    };
  }
}
