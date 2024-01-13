import { IMemberRepository, Member, MemberNotFound } from "../../domain";
import { logger } from "../../../shared/infrastructure";

export class FindMemberById {
  constructor(private readonly memberRepository: IMemberRepository) {}

  async execute(memberId: string): Promise<Member> {
    logger.info(`Buscando miembro por el id: ${memberId}`);
    const member: Member = await this.memberRepository.findById(memberId);

    if (!member) {
      logger.error(`Miembro no encontrado`);
      throw new MemberNotFound();
    }
    logger.info(`Miembro encontrado: ${member.getName()}`);

    return member;
  }
}
