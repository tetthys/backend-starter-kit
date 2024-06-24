export default class CannotReadEnvVariable extends Error {
  constructor(variable) {
    super(`Cannot read env variable ${variable}`);
  }
}
