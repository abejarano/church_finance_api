export * from "./domain/criteria";

export { Paginate } from "./domain/types/paginate";

export { AggregateRoot } from "./domain/aggregate-root";

export { DomainException } from "./domain/exceptions/domain-exception";
export { GenericException } from "./domain/exceptions/generic-exception";
export { InvalidArgumentError } from "./domain/exceptions/invalid-argument-error";

export { StringValueObject } from "./domain/value-object/string-value-object";
export { AmountValueObject } from "./domain/value-object/amount-value-object";

export { encrypt } from "./helpers/hash";
export { checkPassword } from "./helpers/hash";

export { IdentifyEntity } from "./adapter/identify-entity.adapter";

export { HttpStatus } from "./domain/enums/http-status.enum";

import { CustomLogger } from "./infrastructure/custom-logger";

export const logger = new CustomLogger();
