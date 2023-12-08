import { Member } from "../../church/domain";
import { IPasswordAdapter, IUserAppRepository, UserApp } from "../domain";

export class CreateUserApp {
  constructor(
    private readonly userRepository: IUserAppRepository,
    private readonly passwordAdapter: IPasswordAdapter,
  ) {}

  async execute(member: Member): Promise<void> {
    console.log(
      `Solicitud de creación de usuario para el miembro: ${JSON.stringify(
        member,
      )}`,
    );
    const userExist: UserApp = await this.userRepository.findByEmail(
      member.getEmail(),
    );

    if (!userExist) {
      console.log("Crear usuario");

      const user: UserApp = UserApp.create(
        member,
        await this.passwordAdapter.encrypt(member.getDni()),
      );
      console.log(user);
      await this.userRepository.upsert(user);
    }
  }
}
