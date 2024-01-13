import { getInputs, runActionHandler } from "@infra-blocks/github-actions";
import { handler } from "./handler.js";
import { z } from "zod";

runActionHandler(() => {
  const inputs = getInputs("example-input");
  const params = z
    .object({
      "example-input": z.string(),
    })
    .transform((parsed) => ({
      exampleInput: parsed["example-input"],
    }))
    .parse(inputs);
  return handler(params);
});
