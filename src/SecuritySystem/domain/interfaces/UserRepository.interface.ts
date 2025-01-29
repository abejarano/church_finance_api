import { User } from "../User"
import { Criteria, Paginate } from "../../../Shared/domain"

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>

  findByUserId(userId: string): Promise<User | undefined>

  upsert(user: User): Promise<void>

  fetchCriteria(payload: Criteria): Promise<Paginate<User>>

  updatePassword(user: User): Promise<void>
}
