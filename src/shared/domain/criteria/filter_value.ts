import { StringValueObject } from "../value_object/string_value_object";

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
