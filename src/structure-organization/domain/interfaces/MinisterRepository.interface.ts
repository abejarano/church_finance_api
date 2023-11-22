import { Minister } from "../minister";
import { Criteria, Paginate } from "../../../shared";
import { Church } from "../../../church/domain";

export interface IMinisterRepository {
  upsert(minister: Minister): Promise<void>;
  list(criteria: Criteria): Promise<Paginate<Minister>>;
  findById(ministerId: string): Promise<Minister | undefined>;
  findByDni(dni: string): Promise<Minister | undefined>;
  assignChurch(church: Church): Promise<void>;
}
