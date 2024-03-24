import { Church } from "../Church";
import { Criteria, Paginate } from "../../../Shared/domain";

export interface IChurchRepository {
  findById(churchId: string): Promise<Church | undefined>;

  upsert(church: Church): Promise<void>;

  list(criteria: Criteria): Promise<Paginate<Church>>;
}
