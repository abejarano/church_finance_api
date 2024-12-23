// import { ChurchDTO } from "../../../domain";
// import { Paginate } from "../../../../Shared/domain";
// import { Minister } from "../../../../OrganizacionalStructure/domain";
//
// export default (paginate: Paginate<ChurchDTO>, ministers: Minister[]) => {
//   const searchMinister = (churchId: string) => {
//     return ministers.find((m: Minister) => m.getChurchId() === churchId);
//   };
//
//   const results = paginate.results.map((church: ChurchDTO) => {
//     const m = searchMinister(church.churchId);
//     return {
//       ...church,
//       ministers: m === undefined ? null : m?.toPrimitives(),
//     };
//   });
//
//   return { ...paginate, results };
// };
