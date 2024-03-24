import { AggregateRoot } from "../../Shared/domain";
import { IdentifyEntity } from "../../Shared/adapter";
import { OptionModuleDTO } from "./types/option-module.type";

export class Profile extends AggregateRoot {
  private id?: string;
  private profileId: string;
  private name: string;
  private permissions: OptionModuleDTO[];

  static create(name: string, permissions: OptionModuleDTO[]): Profile {
    const p: Profile = new Profile();
    p.name = name;
    p.profileId = IdentifyEntity.get();
    p.permissions = permissions;

    return p;
  }

  static fromPrimitives(plainData: any): Profile {
    const p: Profile = new Profile();
    p.id = plainData.id;
    p.name = plainData.name;
    p.profileId = plainData.profileId;
    p.permissions = plainData.permission;
    return p;
  }

  addPermission(permissions: OptionModuleDTO): void {
    this.permissions.push(permissions);
  }

  getPermission(): OptionModuleDTO[] {
    return this.permissions;
  }

  getProfileId(): string {
    return this.profileId;
  }

  setPermission(permissions: OptionModuleDTO[]): void {
    this.permissions = permissions;
  }

  toPrimitives(): any {
    return {
      profileId: this.profileId,
      name: this.name,
      permission: this.permissions,
    };
  }

  getId(): string {
    return this.id;
  }
}
