import { Member } from "../../Church/domain"
import { IQueue } from "../../Shared/domain"
import { IPasswordAdapter, IUserRepository, ProfileType, User } from "../domain"
import { CreateOrUpdateUser } from "./CreateOrUpdateUser"

export class CreateUserForMember implements IQueue {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordAdapter: IPasswordAdapter
  ) {}

  async handle(args: any): Promise<void> {
    console.log(
      `Solicitud de creación de usuario para el miembro: ${JSON.stringify(
        args
      )}`
    )
    const member = Member.fromPrimitives(args)

    const userExist: User = await this.userRepository.findByEmail(
      member.getEmail()
    )

    if (userExist) {
      return
    }
    console.log("Crear usuario")

    await new CreateOrUpdateUser(
      this.userRepository,
      this.passwordAdapter
    ).execute({
      name: member.getName(),
      memberId: member.getMemberId(),
      email: member.getEmail(),
      password: member.getDni().replace(".", "").replace("-", ""),
      isActive: true,
      profiles: [
        {
          profileType: ProfileType.MEMBER,
        },
      ],
      churchId: member.getChurchId(),
    })
  }
}
