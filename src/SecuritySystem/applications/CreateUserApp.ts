import { Member } from "../../Church/domain";
import { IPasswordAdapter, IUserAppRepository, UserApp } from "../domain";
import { IQueue } from "../../Shared/domain";

export class CreateUserApp implements IQueue {
  constructor(
    private readonly userRepository: IUserAppRepository,
    private readonly passwordAdapter: IPasswordAdapter,
  ) {}

  async handle(args: any): Promise<void> {
    console.log(
      `Solicitud de creación de usuario para el miembro: ${JSON.stringify(
        args,
      )}`,
    );
    const member = Member.fromPrimitives(args);

    const userExist: UserApp = await this.userRepository.findByEmail(
      member.getEmail(),
    );

    if (!userExist) {
      console.log("Crear usuario");

      const user: UserApp = UserApp.create(
        member,
        await this.passwordAdapter.encrypt(member.getDni()),
      );

      await this.userRepository.upsert(user);
    }
  }
}
