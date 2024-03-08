export default class CannotReadEnvVariableError extends Error {
  constructor(message) {
    super(message);
  }
}
