import { PermissionDTO } from "./types/permission.type";
import { AggregateRoot, IdentifyEntity } from "../../shared";

export class Profile extends AggregateRoot {
  private id?: string;
  private profileId: string;
  private name: string;
  private permission: PermissionDTO[];

  static create(name: string, permission: PermissionDTO[]) {
    const p = new Profile();
    p.name = name;
    p.profileId = IdentifyEntity.get();
  }

  addPermission(permission: PermissionDTO): void {
    this.permission.push(permission);
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
