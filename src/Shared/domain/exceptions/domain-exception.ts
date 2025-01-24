export abstract class DomainException implements Error {
  message: string
  name: string

  data?: []

  getMessage(): string {
    return this.message
  }

  getErrorCode() {
    return this.name
  }

  getData(): [] {
    return this.data
  }
}
