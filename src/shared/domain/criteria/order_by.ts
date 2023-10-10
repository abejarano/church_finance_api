import { StringValueObject } from "../value_object/string_value_object";

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
