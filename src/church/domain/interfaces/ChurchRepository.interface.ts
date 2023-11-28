import { Church } from "../Church";
import { Criteria, Paginate } from "../../../shared/domain";

export interface IChurchRepository {
  findById(churchId: string): Promise<Church | undefined>;

  upsert(church: Church): Promise<void>;

  list(criteria: Criteria): Promise<Paginate<Church>>;
}
