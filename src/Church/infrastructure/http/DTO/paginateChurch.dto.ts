import { ChurchDTO } from "../../../domain";
import { Paginate } from "../../../../Shared/domain";
import { Minister } from "../../../../OrganizacionalStructure/domain";

export default (paginate: Paginate<ChurchDTO>, minister: Minister[]) => {
  const searchMinister = (churchId: string) => {
    return minister.find(
      (m: Minister) => m.getChurch()?.getChurchId() === churchId,
    );
  };

  const results = paginate.results.map((church: ChurchDTO) => {
    const m = searchMinister(church.churchId);
    return {
      ...church,
      minister: m === undefined ? null : m?.toPrimitives(),
    };
  });

  return { ...paginate, results };
};
