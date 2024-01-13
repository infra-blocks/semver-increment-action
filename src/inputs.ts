import { checkNotNull } from "@infra-blocks/checks";
import * as semver from "semver";
import { z } from "zod";
import { SemverIncrementActionError } from "./error.js";
import { HandlerParams, Inputs } from "./types.js";

const SEMVER_REGEX =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
const PRERELEASE_PREFIX_REGEX =
  /^((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?$/;
export function parseInputs(inputs: Inputs): HandlerParams {
  try {
    return z
      .object({
        version: z
          .string()
          /**
           * We're using a regex here to validate because semver is too loose, even when parsing with loose = false.
           * For example, it accepts version strings prefixed with "v", which is technically not a valid semantic version.
           */
          .regex(SEMVER_REGEX)
          .refine(
            (version) => semver.parse(version, { loose: false }) != null,
            {
              message: "invalid semver version",
            },
          )
          .transform((version) =>
            checkNotNull(semver.parse(version, { loose: false })),
          ),
        type: z.enum([
          "major",
          "minor",
          "patch",
          "premajor",
          "preminor",
          "prepatch",
          "prerelease",
        ]),
        "prerelease-prefix": z
          .string()
          .regex(PRERELEASE_PREFIX_REGEX)
          .optional(),
        "prerelease-base": z
          .union([
            z.enum(["0", "1"]),
            z.literal("false").transform(() => false as const),
          ])
          .optional(),
      })
      .refine(
        (parsed) =>
          parsed["prerelease-base"] !== false ||
          (parsed["prerelease-prefix"] != null &&
            parsed["prerelease-prefix"] !== ""),
        { message: "cannot set prerelease base to false without a prefix!" },
      )
      .transform((parsed) => ({
        version: parsed.version,
        type: parsed.type,
        prereleasePrefix: parsed["prerelease-prefix"],
        prereleaseBase: parsed["prerelease-base"],
      }))
      .parse(inputs);
  } catch (err) {
    throw new SemverIncrementActionError(
      { cause: err as Error },
      `error parsing inputs ${JSON.stringify(inputs)}`,
    );
  }
}
