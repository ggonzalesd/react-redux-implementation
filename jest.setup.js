import "whatwg-fetch";
import { getEnvironment } from "./src/helpers/getEnvironments";

require("dotenv").config({
  path: ".env.test",
});

jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironment: () => ({ ...process.env }),
}));
