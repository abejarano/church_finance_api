import { MinisterType } from "../enums/MinisterType.enum"

export type MinisterRequest = {
  name: string
  email: string
  phone: string
  dni: string
  ministerType: MinisterType
}
