import { Collection, ObjectId } from "mongodb"
import { AggregateRoot, Criteria, Paginate } from "../../domain"
import { MongoCriteriaConverter, MongoQuery } from "./MongoCriteriaConverter"
import { MongoClientFactory } from "./MongoClientFactory"

export abstract class MongoRepository<T extends AggregateRoot> {
  private criteriaConverter: MongoCriteriaConverter
  private query: MongoQuery
  private criteria: Criteria

  constructor() {
    this.criteriaConverter = new MongoCriteriaConverter()
  }

  abstract collectionName(): string

  transformationToUpsertInSubDocuments(
    subDocumentField: string,
    primitiveData: any
  ): {} {
    const response = {}

    for (const key in primitiveData) {
      response[`${subDocumentField}.$.${key}`] = primitiveData[key]
    }

    return response
  }

  public async buildPaginate<T>(documents: T[]): Promise<Paginate<T>> {
    const collection = await this.collection()

    const count = await collection.countDocuments(this.query.filter)

    const hasNextPage: boolean =
      this.criteria.currentPage * this.criteria.limit < count

    if (documents.length === 0) {
      return {
        nextPag: null,
        count: 0,
        results: [],
      }
    }

    return {
      nextPag: hasNextPage ? Number(this.criteria.currentPage) + 1 : null,
      count: count,
      results: documents,
    }
  }

  protected async collection<T>(): Promise<Collection<T>> {
    return (await MongoClientFactory.createClient())
      .db()
      .collection<T>(this.collectionName())
  }

  // todo return types
  protected async persist(id: string, aggregateRoot: T): Promise<ObjectId> {
    let primitives: any

    if (aggregateRoot.toPrimitives() instanceof Promise) {
      primitives = await aggregateRoot.toPrimitives()
    } else {
      primitives = aggregateRoot.toPrimitives()
    }

    return await this.execUpdateOne(id, {
      ...primitives,
      id: id,
    })
  }

  protected async execUpdateOne(id: string, document: any): Promise<ObjectId> {
    const collection = await this.collection()

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: document },
      { upsert: true }
    )

    return result.upsertedId
  }

  protected async searchByCriteria<D>(
    criteria: Criteria,
    fieldsToExclude: string[] = []
  ): Promise<D[]> {
    this.criteria = criteria
    this.query = this.criteriaConverter.convert(criteria)

    const collection = await this.collection()

    if (fieldsToExclude.length === 0) {
      return await collection
        .find<D>(this.query.filter, {})
        .sort(this.query.sort)
        .skip(this.query.skip)
        .limit(this.query.limit)
        .toArray()
    }

    const projection: { [key: string]: 0 } = {}
    fieldsToExclude.forEach((field) => {
      projection[field] = 0
    })

    return await collection
      .find<D>(this.query.filter, { projection })
      .sort(this.query.sort)
      .skip(this.query.skip)
      .limit(this.query.limit)
      .toArray()
  }

  /**
   *
   * @param criteria
   * @param objectTypeField campo de tipo objeto que deseo paginar
   * @protected
   */
  protected async searchByCriteriaWithProjection<D>(
    criteria: Criteria,
    objectTypeField: string
  ): Promise<D[]> {
    this.criteria = criteria
    this.query = this.criteriaConverter.convert(criteria)

    const projection: { [key: string]: any } = {}
    projection[objectTypeField] = {
      $slice: [Number(this.query.skip), Number(this.query.limit)],
    }

    const collection = await this.collection()
    return await collection
      .find<D>(this.query.filter, { projection })
      .sort(this.query.sort)
      .toArray()
  }
}
