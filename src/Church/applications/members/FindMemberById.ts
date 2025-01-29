import { IMemberRepository, Member, MemberNotFound } from "../../domain"

import { Logger } from "../../../Shared/adapter"

export class FindMemberById {
  private logger = Logger("FindMemberById")

  constructor(private readonly memberRepository: IMemberRepository) {}

  async execute(memberId: string): Promise<Member> {
    this.logger.info(`Buscando miembro por el id: ${memberId}`)
    const member: Member = await this.memberRepository.one(memberId)

    if (!member) {
      this.logger.error(`Miembro no encontrado`)
      throw new MemberNotFound()
    }
    this.logger.info(`Miembro encontrado: ${member.getName()}`)

    return member
  }
}
