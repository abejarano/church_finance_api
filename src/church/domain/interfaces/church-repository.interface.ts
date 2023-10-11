import { Member } from "../member";
import { Church } from "../church";
import { Criteria, Paginate } from "../../../shared";

export interface IChurchRepository {
  findById(churchId: string): Promise<Church>;
  upsert(church: Church): Promise<void>;
  criteria(criteria: Criteria): Promise<Paginate<Church>>;
}
