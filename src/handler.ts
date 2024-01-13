import core from "@actions/core";
import { checkNotNull } from "@infra-blocks/checks";
import * as semver from "semver";
import { HandlerOutputs, HandlerParams } from "./types.js";

export function handler(params: HandlerParams): Promise<HandlerOutputs> {
  const { version, type, prereleasePrefix = "", prereleaseBase = "0" } = params;

  core.info(`incrementing ${version.raw} with ${type}`);
  const result = checkNotNull(
    semver.parse(semver.inc(version, type, prereleasePrefix, prereleaseBase)),
  );
  return Promise.resolve({
    version: result.version,
    major: result.major,
    minor: result.minor,
    patch: result.patch,
    prerelease: result.prerelease.map((id) => id.toString()).join("."),
    "prerelease-ids": result.prerelease,
    build: result.build.join("."),
    "build-ids": result.build,
  });
}
