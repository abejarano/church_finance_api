import {
  Church,
  ChurchNotFound,
  IChurchRepository,
  IMemberRepository,
  Member,
} from "../../domain";
import { MemberRequest } from "../../infrastructure/http/requests/Member.request";

export class CreateOrUpdateMember {
  constructor(
    private readonly memberRepository: IMemberRepository,
    private readonly churchRepository: IChurchRepository,
  ) {}

  async execute(request: MemberRequest) {
    if (!request.memberId) {
      await this.create(request);
      return;
    }

    const member = await this.memberRepository.findById(request.memberId);
    member.setDni(request.dni);
    member.setEmail(request.email);
    member.setPhone(request.phone);
    member.setName(request.name);
    member.setBirthdate(request.birthdate);
    member.setBaptismDate(request.baptismDate);
    member.setConversionDate(request.conversionDate);

    return await this.memberRepository.upsert(member);
  }

  private async getChurch(churchId: string): Promise<Church> {
    const church: Church = await this.churchRepository.findById(churchId);

    if (!church) {
      throw new ChurchNotFound();
    }
    return church;
  }

  private async create(request: MemberRequest) {
    const church = await this.getChurch(request.churchId);

    const member = Member.create(
      request.name,
      request.phone,
      request.dni,
      church,
      request.birthdate,
      request.email,
      request.conversionDate,
      request.baptismDate,
    );

    return await this.memberRepository.upsert(member);
  }
}
