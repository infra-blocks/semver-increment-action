import { checkNotNull } from "@infra-blocks/checks";
import { expect } from "@infra-blocks/test";
import * as semver from "semver";
import { handler } from "../../src/handler.js";

describe("handler", function () {
  // For all types but prerelease, semver doesn't look at anything but major.minor.patch and params to generate new version.
  describe(handler.name, function () {
    describe("from release 1.2.3", function () {
      const version = checkNotNull(semver.parse("1.2.3"));

      describe("releases", function () {
        it("should work for type major", async function () {
          const outputs = await handler({ version, type: "major" });
          expect(outputs).to.deep.equal({
            version: "2.0.0",
            major: 2,
            minor: 0,
            patch: 0,
            prerelease: "",
            "prerelease-ids": [],
            build: "",
            "build-ids": [],
          });
        });
        it("should work for type minor", async function () {
          const outputs = await handler({ version, type: "minor" });
          expect(outputs).to.deep.equal({
            version: "1.3.0",
            major: 1,
            minor: 3,
            patch: 0,
            prerelease: "",
            "prerelease-ids": [],
            build: "",
            "build-ids": [],
          });
        });
        it("should work for type patch", async function () {
          const outputs = await handler({ version, type: "patch" });
          expect(outputs).to.deep.equal({
            version: "1.2.4",
            major: 1,
            minor: 2,
            patch: 4,
            prerelease: "",
            "prerelease-ids": [],
            build: "",
            "build-ids": [],
          });
        });
      });
      describe("prereleases", function () {
        describe("without prerelease prefix", function () {
          it("should work for type premajor", async function () {
            const outputs = await handler({ version, type: "premajor" });
            expect(outputs).to.deep.equal({
              version: "2.0.0-0",
              major: 2,
              minor: 0,
              patch: 0,
              prerelease: "0",
              "prerelease-ids": [0],
              build: "",
              "build-ids": [],
            });
          });
          it("should work for type preminor", async function () {
            const outputs = await handler({ version, type: "preminor" });
            expect(outputs).to.deep.equal({
              version: "1.3.0-0",
              major: 1,
              minor: 3,
              patch: 0,
              prerelease: "0",
              "prerelease-ids": [0],
              build: "",
              "build-ids": [],
            });
          });
          it("should work for type prepatch", async function () {
            const outputs = await handler({ version, type: "prepatch" });
            expect(outputs).to.deep.equal({
              version: "1.2.4-0",
              major: 1,
              minor: 2,
              patch: 4,
              prerelease: "0",
              "prerelease-ids": [0],
              build: "",
              "build-ids": [],
            });
          });
          // Same as prepatch on a release version.
          it("should work for type prerelease", async function () {
            const outputs = await handler({ version, type: "prerelease" });
            expect(outputs).to.deep.equal({
              version: "1.2.4-0",
              major: 1,
              minor: 2,
              patch: 4,
              prerelease: "0",
              "prerelease-ids": [0],
              build: "",
              "build-ids": [],
            });
          });
          describe("with prerelease base 1", function () {
            const prereleaseBase = "1";
            it("should work for type premajor", async function () {
              const outputs = await handler({
                version,
                type: "premajor",
                prereleaseBase,
              });
              expect(outputs).to.deep.equal({
                version: "2.0.0-1",
                major: 2,
                minor: 0,
                patch: 0,
                prerelease: "1",
                "prerelease-ids": [1],
                build: "",
                "build-ids": [],
              });
            });
            it("should work for type preminor", async function () {
              const outputs = await handler({
                version,
                type: "preminor",
                prereleaseBase,
              });
              expect(outputs).to.deep.equal({
                version: "1.3.0-1",
                major: 1,
                minor: 3,
                patch: 0,
                prerelease: "1",
                "prerelease-ids": [1],
                build: "",
                "build-ids": [],
              });
            });
            it("should work for type prepatch", async function () {
              const outputs = await handler({
                version,
                type: "prepatch",
                prereleaseBase,
              });
              expect(outputs).to.deep.equal({
                version: "1.2.4-1",
                major: 1,
                minor: 2,
                patch: 4,
                prerelease: "1",
                "prerelease-ids": [1],
                build: "",
                "build-ids": [],
              });
            });
            // Same as prepatch here too.
            it("should work for type prerelease", async function () {
              const outputs = await handler({
                version,
                type: "prerelease",
                prereleaseBase,
              });
              expect(outputs).to.deep.equal({
                version: "1.2.4-1",
                major: 1,
                minor: 2,
                patch: 4,
                prerelease: "1",
                "prerelease-ids": [1],
                build: "",
                "build-ids": [],
              });
            });
          });
        });
        describe("with prerelease prefix alpha", function () {
          const prereleasePrefix = "alpha";
          it("should work for type premajor", async function () {
            const outputs = await handler({
              version,
              type: "premajor",
              prereleasePrefix,
            });
            expect(outputs).to.deep.equal({
              version: "2.0.0-alpha.0",
              major: 2,
              minor: 0,
              patch: 0,
              prerelease: "alpha.0",
              "prerelease-ids": ["alpha", 0],
              build: "",
              "build-ids": [],
            });
          });
          it("should work for type preminor", async function () {
            const outputs = await handler({
              version,
              type: "preminor",
              prereleasePrefix,
            });
            expect(outputs).to.deep.equal({
              version: "1.3.0-alpha.0",
              major: 1,
              minor: 3,
              patch: 0,
              prerelease: "alpha.0",
              "prerelease-ids": ["alpha", 0],
              build: "",
              "build-ids": [],
            });
          });
          it("should work for type prepatch", async function () {
            const outputs = await handler({
              version,
              type: "prepatch",
              prereleasePrefix,
            });
            expect(outputs).to.deep.equal({
              version: "1.2.4-alpha.0",
              major: 1,
              minor: 2,
              patch: 4,
              prerelease: "alpha.0",
              "prerelease-ids": ["alpha", 0],
              build: "",
              "build-ids": [],
            });
          });
          // Same as prepatch here too.
          it("should work for type prerelease", async function () {
            const outputs = await handler({
              version,
              type: "prerelease",
              prereleasePrefix,
            });
            expect(outputs).to.deep.equal({
              version: "1.2.4-alpha.0",
              major: 1,
              minor: 2,
              patch: 4,
              prerelease: "alpha.0",
              "prerelease-ids": ["alpha", 0],
              build: "",
              "build-ids": [],
            });
          });
          describe("with prerelease base 1", function () {
            const prereleaseBase = "1";
            it("should work for type premajor", async function () {
              const outputs = await handler({
                version,
                type: "premajor",
                prereleasePrefix,
                prereleaseBase,
              });
              expect(outputs).to.deep.equal({
                version: "2.0.0-alpha.1",
                major: 2,
                minor: 0,
                patch: 0,
                prerelease: "alpha.1",
                "prerelease-ids": ["alpha", 1],
                build: "",
                "build-ids": [],
              });
            });
            it("should work for type preminor", async function () {
              const outputs = await handler({
                version,
                type: "preminor",
                prereleasePrefix,
                prereleaseBase,
              });
              expect(outputs).to.deep.equal({
                version: "1.3.0-alpha.1",
                major: 1,
                minor: 3,
                patch: 0,
                prerelease: "alpha.1",
                "prerelease-ids": ["alpha", 1],
                build: "",
                "build-ids": [],
              });
            });
            it("should work for type prepatch", async function () {
              const outputs = await handler({
                version,
                type: "prepatch",
                prereleasePrefix,
                prereleaseBase,
              });
              expect(outputs).to.deep.equal({
                version: "1.2.4-alpha.1",
                major: 1,
                minor: 2,
                patch: 4,
                prerelease: "alpha.1",
                "prerelease-ids": ["alpha", 1],
                build: "",
                "build-ids": [],
              });
            });
            // Same as prepatch here too.
            it("should work for type prerelease", async function () {
              const outputs = await handler({
                version,
                type: "prerelease",
                prereleasePrefix,
                prereleaseBase,
              });
              expect(outputs).to.deep.equal({
                version: "1.2.4-alpha.1",
                major: 1,
                minor: 2,
                patch: 4,
                prerelease: "alpha.1",
                "prerelease-ids": ["alpha", 1],
                build: "",
                "build-ids": [],
              });
            });
          });
        });
      });
    });
    // Everything else works the same from prereleases, except the prerelease type.
    describe("from prerelease 1.2.3-alpha.5", function () {
      const version = checkNotNull(semver.parse("1.2.3-alpha.5"));

      it("should work for type prerelease with prefix set", async function () {
        const outputs = await handler({
          version,
          type: "prerelease",
          prereleasePrefix: "alpha",
        });
        expect(outputs).to.deep.equal({
          version: "1.2.3-alpha.6",
          major: 1,
          minor: 2,
          patch: 3,
          prerelease: "alpha.6",
          "prerelease-ids": ["alpha", 6],
          build: "",
          "build-ids": [],
        });
      });
      it("should work for type prerelease without prefix", async function () {
        const outputs = await handler({
          version,
          type: "prerelease",
        });
        expect(outputs).to.deep.equal({
          version: "1.2.3-alpha.6",
          major: 1,
          minor: 2,
          patch: 3,
          prerelease: "alpha.6",
          "prerelease-ids": ["alpha", 6],
          build: "",
          "build-ids": [],
        });
      });
    });
  });
});
