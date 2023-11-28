import { IMemberRepository, Member, MemberNotFound } from "../../domain";
import { logger } from "../../../shared/infrastructure";

export class FindMemberById {
  constructor(private readonly memberRepository: IMemberRepository) {}

  async execute(memberId: string): Promise<Member> {
    logger.info(`Buscando miembro por el id: ${memberId}`);
    const member: Member = await this.memberRepository.findById(memberId);

    if (!member) {
      throw new MemberNotFound();
    }

    return member;
  }
}
