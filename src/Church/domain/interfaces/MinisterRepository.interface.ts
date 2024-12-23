import { Minister } from "../Minister";
import { Criteria, Paginate } from "../../../Shared/domain";

export interface IMinisterRepository {
  upsert(minister: Minister): Promise<void>;

  list(criteria: Criteria): Promise<Paginate<Minister>>;

  findById(ministerId: string): Promise<Minister | undefined>;

  findByDni(dni: string): Promise<Minister | undefined>;

  withoutAssignedChurch(): Promise<Minister[]>;

  hasAnAssignedChurch(ministerId: string): Promise<[boolean, Minister]>;
}
