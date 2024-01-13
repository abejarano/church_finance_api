export type OptionModuleDTO = {
  optionModuleId: string;
  name: string;
  description: string;
  isActive: boolean;
  URL: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
};
