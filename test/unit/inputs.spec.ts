import { expect } from "@infra-blocks/test";
<<<<<<< HEAD
import * as semver from "semver";
import { parseInputs } from "../../src/inputs.js";
import { HandlerParams } from "../../src/types.js";

describe("inputs", function () {
  describe(parseInputs.name, function () {
    function expectParsedInputs(params: {
      effective: HandlerParams;
      expected: {
        version: string;
        type: string;
        prereleasePrefix?: string;
        prereleaseBase?: "0" | "1" | false;
      };
    }) {
      const { version, type, prereleasePrefix, prereleaseBase } =
        params.expected;

      expect(params.effective).to.deep.equal({
        version: semver.parse(version, { loose: false }),
        type,
        prereleasePrefix,
        prereleaseBase,
      });
    }

    describe("version", function () {
      const type = "major";

      it("should work with a valid version without v", function () {
        expectParsedInputs({
          effective: parseInputs({ version: "1.2.3", type }),
          expected: {
            version: "1.2.3",
            type,
          },
        });
      });
      // vX.X.X is technically not a semantic version.
      it("should throw when prefixed with v", function () {
        expect(() => parseInputs({ version: "v1.2.3", type })).to.throw();
      });
      it("should throw if the version isn't valid", function () {
        expect(() => parseInputs({ version: "toto-tata", type })).to.throw();
      });
      it("should throw if the version is missing", function () {
        expect(() => parseInputs({ type })).to.throw();
      });
    });
    describe("type", function () {
      const version = "1.2.3";

      for (const type of [
        "major",
        "minor",
        "patch",
        "premajor",
        "preminor",
        "prepatch",
        "prerelease",
      ]) {
        it(`should work with ${type}`, function () {
          expectParsedInputs({
            effective: parseInputs({ version, type }),
            expected: {
              version,
              type,
            },
          });
        });
      }

      it("should throw for invalid type", function () {
        expect(() => parseInputs({ version, type: "postmajor" })).to.throw();
      });
      it("should throw if type is missing", function () {
        expect(() => parseInputs({ version })).to.throw();
      });
    });
    describe("prerelease-prefix", function () {
      const version = "1.2.3";
      const type = "major";

      it("should work for a valid prefix", function () {
        expectParsedInputs({
          effective: parseInputs({
            version,
            type,
            "prerelease-prefix": "toto-tata",
          }),
          expected: {
            version,
            type,
            prereleasePrefix: "toto-tata",
          },
        });
      });
      it("should throw for an invalid prefix", function () {
        expect(() =>
          parseInputs({ version, type, "prerelease-prefix": "^bigtoto$" }),
        ).to.throw();
      });
    });
    describe("prerelease-base", function () {
      const version = "1.2.3";
      const type = "major";

      it("should work for a prerelease base of 0", function () {
        expectParsedInputs({
          effective: parseInputs({
            version,
            type,
            "prerelease-base": "0",
          }),
          expected: {
            version,
            type,
            prereleaseBase: "0",
          },
        });
      });
      it("should work for a prerelease base of 1", function () {
        expectParsedInputs({
          effective: parseInputs({
            version,
            type,
            "prerelease-base": "1",
          }),
          expected: {
            version,
            type,
            prereleaseBase: "1",
          },
        });
      });
      it("should work for a prerelease base of false", function () {
        expectParsedInputs({
          effective: parseInputs({
            version,
            type,
            "prerelease-prefix": "must-be-set",
            "prerelease-base": "false",
          }),
          expected: {
            version,
            type,
            prereleasePrefix: "must-be-set",
            prereleaseBase: false,
          },
        });
      });
      it("should throw for a prerelease base of false without prefix", function () {
        expect(() =>
          parseInputs({ version, type, "prerelease-base": "false" }),
        ).to.throw();
      });
      it("should throw for a prerelease base of 2", function () {
        expect(() =>
          parseInputs({ version, type, "prerelease-base": "2" }),
        ).to.throw();
      });
      it("should throw for a prerelease base of true", function () {
        expect(() =>
          parseInputs({ version, type, "prerelease-base": "true" }),
        ).to.throw();
=======
import { parseInputs } from "../../src/intputs.js";

describe("inputs", function () {
  describe(parseInputs.name, function () {
    describe("example-input", function () {
      it("should work with a valid value", function () {
        expect(parseInputs({ "example-input": "hello" })).to.deep.equal({
          exampleInput: "hello",
        });
      });
      it("should throw when input is missing", function () {
        expect(() => parseInputs({})).to.throw();
>>>>>>> template/master
      });
    });
  });
});
