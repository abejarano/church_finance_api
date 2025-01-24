import { DomainException } from '../../../Shared/domain'

export class UserGroupNotFound extends DomainException {
  name = 'PROFILE_NOT_FOUND'
  message = 'profile not found'
}
