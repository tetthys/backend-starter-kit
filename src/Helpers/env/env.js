import "dotenv/config";
import CannotReadEnvVariable from "./Errors/CannotReadEnvVariable";

const env = (variable) => {
  if (!process.env[variable]) {
    throw new CannotReadEnvVariable(variable);
  }
  return process.env[variable];
};

export default env;
