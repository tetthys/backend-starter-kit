import "dotenv/config";
import CannotReadEnvVariableError from "./error/CannotReadEnvVariableError";

const env = (variable) => {
  const value = process.env[variable];
  if (value === undefined) {
    throw new CannotReadEnvVariableError();
  }
  return value;
};

export default env;
