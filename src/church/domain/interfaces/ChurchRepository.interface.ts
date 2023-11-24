import { Member } from "../Member";
import { Church } from "../Church";
import { Criteria, Paginate } from "../../../shared";

export interface IChurchRepository {
  findById(churchId: string): Promise<Church | undefined>;
  upsert(church: Church): Promise<void>;
  list(criteria: Criteria): Promise<Paginate<Church>>;
}
