import {
  ChurchStatus,
  IChurchRepository,
  IMinisterRepository,
} from '../../domain'
import { GenericException } from '../../../Shared/domain'

export class AssignChurch {
  constructor(
    private readonly ministerRepository: IMinisterRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async execute(ministerId: string, churchId: string): Promise<void> {
    console.log(`Assigning church ${churchId} to minister ${ministerId}`)
    const [hasAnAssignedMinister, church] =
      await this.churchRepository.hasAnAssignedMinister(churchId)

    if (hasAnAssignedMinister) {
      throw new GenericException(
        'This church already has an assigned ministers',
      )
    }

    const [hasAnAssignedChurch, minister] =
      await this.ministerRepository.hasAnAssignedChurch(ministerId)
    if (hasAnAssignedChurch) {
      throw new GenericException(
        'This ministers already has an assigned church',
      )
    }

    church.setMinister(minister)
    church.setStatus(ChurchStatus.ACTIVE)

    await this.churchRepository.upsert(church)

    minister.setChurch(church)

    await this.ministerRepository.upsert(minister)
  }
}
