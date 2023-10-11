import { Criteria, Paginate } from "../../../shared";
import { Member } from "../member";

export interface IMemberRepository {
  findById(memberId: string): Promise<Member>;
  upsert(member: Member): Promise<void>;
  paginate(
    criteria: Criteria,
    page: number,
    perPage: number,
  ): Promise<Paginate<Member>>;
}
