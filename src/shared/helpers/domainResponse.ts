import { DomainException } from "../domain/exceptions/domain-exception";
import { HttpStatus } from "../domain/enums/http-status.enum";

export default (e, res) => {
  if (e instanceof DomainException) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ code: e.getErrorCode(), message: e.getMessage() });
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
};
