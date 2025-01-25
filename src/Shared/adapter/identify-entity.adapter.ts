import { v4 } from "uuid"

export class IdentifyEntity {
  static get(): string {
    return v4()
  }
}
