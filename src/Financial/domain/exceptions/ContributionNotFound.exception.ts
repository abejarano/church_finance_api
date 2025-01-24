import { DomainException } from '../../../Shared/domain'

export class ContributionNotFound extends DomainException {
  name = 'CONTRIBUTION_NOT_FOUND'
  message = 'Contribution not found'
}
