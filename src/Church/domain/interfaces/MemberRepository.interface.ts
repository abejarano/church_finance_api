import { Criteria, Paginate } from "../../../Shared/domain";
import { Member } from "../Member";

export interface IMemberRepository {
  findById(memberId: string): Promise<Member | undefined>;

  findByDni(dni: string): Promise<Member | undefined>;

  upsert(member: Member): Promise<void>;

  list(criteria: Criteria): Promise<Paginate<Member>>;
}
