import { Profile } from "./profile";
import { AggregateRoot, IdentifyEntity } from "../../shared";
import { PermissionDTO } from "./types/permission.type";

export class User extends AggregateRoot {
  private id?: string;
  private userId: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private active: boolean;
  private profileId: string;
  private permission: PermissionDTO[];
  private isStaff: boolean;
  private isSuperuser: boolean;

  static create(
    email: string,
    password: string,
    isStaff: boolean,
    isSuperuser: boolean,
    profile: Profile,
  ): User {
    const u = new User();
    u.email = email;
    u.password = password;
    u.profileId = profile.getProfileId();
    u.userId = IdentifyEntity.get();
    u.permission = profile.getPermission();
    u.createdAt = new Date();
    u.active = true;
    u.isStaff = isStaff;
    u.isSuperuser = isSuperuser;

    return u;
  }

  static fromPrimitives(data: any): User {
    const u: User = new User();
    u.email = data.email;
    u.createdAt = data.createdAt;
    u.active = data.active;
    u.id = data.id;
    u.password = data.password;
    u.userId = data.userId;
    u.profileId = data.profileId;
    u.permission = data.permission;
    u.isStaff = data.isStaff;
    u.isSuperuser = data.isSuperuser;

    return u;
  }

  getId(): string {
    return this.id;
  }

  getPermission(): PermissionDTO[] {
    return this.permission;
  }

  getProfileId(): string {
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

  staff(): boolean {
    return this.isStaff;
  }

  superUser(): boolean {
    return this.isSuperuser;
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

  disableUser(): User {
    this.active = false;
    return this;
  }

  toPrimitives(): any {
    return {
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      active: this.active,
      permission: this.permission,
      profileId: this.profileId,
      userId: this.userId,
      isStaff: this.isStaff,
      isSuperuser: this.isSuperuser,
    };
  }
}
