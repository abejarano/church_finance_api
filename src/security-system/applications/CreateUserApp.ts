import { Member } from "../../church/domain";
import { IUserAppRepository, UserApp } from "../domain";
import * as console from "console";
import { PasswordAdapter } from "../../shared/adapter";

export class CreateUserApp {
  constructor(private readonly userRepository: IUserAppRepository) {}

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
      const pass = await PasswordAdapter.instance(
        member.getDni(),
      ).getValueEncrypt();

      const user: UserApp = UserApp.create(member, pass);
      console.log(user);
      await this.userRepository.upsert(user);
    }
  }
}
