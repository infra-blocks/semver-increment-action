import { getInputs, runActionHandler } from "@infra-blocks/github-actions";
import { handler } from "./handler.js";
import { parseInputs } from "./intputs.js";

runActionHandler(() => {
  return handler(parseInputs(getInputs("example-input")));
});
