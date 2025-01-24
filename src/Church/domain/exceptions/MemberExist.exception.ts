import { DomainException } from '../../../Shared/domain'

export class MemberExist extends DomainException {
  code = 'MEMBER_EXIST'
  message = 'The member already exist'
}
