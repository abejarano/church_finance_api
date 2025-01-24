import { ProfileType } from '../enums/profileType.enum'

export type Profile = {
  profileType: ProfileType
  actions?: string[]
}
