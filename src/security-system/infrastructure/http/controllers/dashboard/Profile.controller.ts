import { CreateProfileRequest } from "../../../../domain";
import {
  CreateOrUpdateProfile,
  FetchAllProfiles,
  FindProfileByProfileId,
} from "../../../../applications";
import { HttpStatus } from "../../../../../shared/domain";
import domainResponse from "../../../../../shared/helpers/domainResponse";
import { SystemModuleMongoRepository } from "../../../persistence/SystemModuleMongoRepository";
import { ProfileMongoRepository } from "../../../persistence/ProfileMongoRepository";

export class ProfileController {
  static async createProfile(payload: CreateProfileRequest, res) {
    try {
      const profile = await new CreateOrUpdateProfile(
        SystemModuleMongoRepository.getInstance(),
        ProfileMongoRepository.getInstance(),
      ).execute(payload);

      res.status(HttpStatus.CREATED).send({
        message: "Perfil creado con exito",
        data: profile,
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async fetchAllProfile(res) {
    try {
      const profiles = await new FetchAllProfiles(
        ProfileMongoRepository.getInstance(),
      ).execute();

      res
        .status(HttpStatus.OK)
        .send({ message: "Perfiles encontrados", data: profiles });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findByProfileId(profileId: string, res) {
    try {
      const profile = await new FindProfileByProfileId(
        ProfileMongoRepository.getInstance(),
      ).execute(profileId);

      res
        .status(HttpStatus.OK)
        .send({ message: "Perfil encontrado", data: profile });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
