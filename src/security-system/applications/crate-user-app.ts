import { Member } from "../../church/domain";
import { UserApp } from "../domain/user-app";
import { IUserAppRepository } from "../domain/interfaces/user-app-repository.interface";

export class CrateUserApp {
  constructor(private readonly userRepository: IUserAppRepository) {}

  async execute(member: Member): Promise<void> {
    if (!(await this.userRepository.findByEmail(member.getEmail()))) {
      const user: UserApp = UserApp.create(member);
      await this.userRepository.upsert(user);
    }
  }
}
