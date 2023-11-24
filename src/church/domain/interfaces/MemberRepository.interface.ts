import { Criteria, Paginate } from "../../../shared";
import { Member } from "../Member";

export interface IMemberRepository {
  findById(memberId: string): Promise<Member>;
  upsert(member: Member): Promise<void>;
  list(criteria: Criteria): Promise<Paginate<Member>>;
}
