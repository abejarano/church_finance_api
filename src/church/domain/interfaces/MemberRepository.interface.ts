import { Criteria, Paginate } from "../../../shared";
import { Member } from "../member";

export interface IMemberRepository {
  findById(memberId: string): Promise<Member>;
  upsert(member: Member): Promise<void>;
  list(criteria: Criteria): Promise<Paginate<Member>>;
}
