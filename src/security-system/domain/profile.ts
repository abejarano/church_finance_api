import { PermissionDTO } from "./types/permission.type";
import { AggregateRoot, IdentifyEntity } from "../../shared";

export class Profile extends AggregateRoot {
  private id?: string;
  private profileId: string;
  private name: string;
  private permission: PermissionDTO[];

  static create(name: string, permission: PermissionDTO[]): Profile {
    const p = new Profile();
    p.name = name;
    p.profileId = IdentifyEntity.get();
    p.permission = permission;

    return p;
  }

  static fromPrimitives(plainData: any): Profile {
    const p = new Profile();
    p.id = plainData.id;
    p.name = plainData.name;
    p.profileId = plainData.profileId;
    p.permission = plainData.permission;
    return p;
  }

  addPermission(permission: PermissionDTO): void {
    this.permission.push(permission);
  }

  getPermission(): PermissionDTO[] {
    return this.permission;
  }

  getProfileId(): string {
    return this.profileId;
  }

  toPrimitives(): any {
    return {
      profileId: this.profileId,
      name: this.name,
      permission: this.permission,
    };
  }

  getId(): string {
    return this.id;
  }
}
