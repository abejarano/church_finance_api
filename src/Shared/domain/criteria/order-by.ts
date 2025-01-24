import { StringValueObject } from '../value-object/string-value-object'

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value)
  }
}
