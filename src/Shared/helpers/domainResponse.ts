import { DomainException, HttpStatus } from '../domain'

export default (e, res) => {
  if (e instanceof DomainException) {
    res.status(HttpStatus.BAD_REQUEST).send({
      code: e.getErrorCode(),
      message: e.getMessage(),
    })
    return
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message })
}
