import { getInputs, runActionHandler } from "@infra-blocks/github-actions";
import { handler } from "./handler.js";
<<<<<<< HEAD
import { parseInputs } from "./inputs.js";

runActionHandler(() => {
  return handler(
    parseInputs(getInputs("version", "type", "prerelease-prefix")),
  );
=======
import { parseInputs } from "./intputs.js";

runActionHandler(() => {
  return handler(parseInputs(getInputs("example-input")));
>>>>>>> template/master
});
