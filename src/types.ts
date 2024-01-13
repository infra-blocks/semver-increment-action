<<<<<<< HEAD
import * as semver from "semver";

export interface Inputs {
  version?: string;
  type?: string;
  "prerelease-prefix"?: string;
  "prerelease-base"?: string;
}

export type PrereleaseBase = "0" | "1" | false;

export interface HandlerParams {
  version: semver.SemVer;
  type: semver.ReleaseType;
  prereleasePrefix?: string;
  prereleaseBase?: PrereleaseBase;
}

/**
 * The outputs of the handler.
 *
 * Not returning build identifiers because semver trips them out on version increment.
 */
export interface HandlerOutputs {
  version: string;
  major: number;
  minor: number;
  patch: number;
  prerelease: string;
  "prerelease-ids": ReadonlyArray<string | number>;
=======
export interface Inputs {
  "example-input"?: string;
}

export interface HandlerParams {
  exampleInput: string;
}

export interface HandlerOutputs {
  "example-output": string;
>>>>>>> template/master
}
