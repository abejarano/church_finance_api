import { IWorldRepository, States } from '../../domain'
import { MongoRepository } from '../../../Shared/infrastructure'

export class WorldMongoRepository
  extends MongoRepository<any>
  implements IWorldRepository
{
  private static instance: WorldMongoRepository
  private collectName: string = 'states'

  constructor() {
    super()
  }

  static getInstance(): WorldMongoRepository {
    if (!WorldMongoRepository.instance) {
      WorldMongoRepository.instance = new WorldMongoRepository()
    }
    return WorldMongoRepository.instance
  }

  collectionName(): string {
    return this.collectName
  }

  async findStateById(stateId: string): Promise<States> {
    const collection = await this.collection()
    const result = await collection.findOne({ stateId: stateId })
    if (!result) {
      return undefined
    }

    return States.fromPrimitives({ ...result, id: result._id })
  }

  async findByCountryId(countryId: string): Promise<States[]> {
    const collection = await this.collection()
    const result = await collection.find({ countryId: countryId }).toArray()
    return result.map((state) =>
      States.fromPrimitives({ ...state, id: state._id }),
    )
  }
}
