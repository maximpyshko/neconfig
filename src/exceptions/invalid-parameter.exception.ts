export class InvalidParameterException extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }
}
