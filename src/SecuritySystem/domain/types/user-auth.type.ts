import { ProfileType } from '../enums/profileType.enum'
import { Profile } from './profile.type'

export type UserAuthDTO = {
  churchId: string
  userId: string
  email: string
  isSuperuser: boolean
  profiles: Profile[]
}
