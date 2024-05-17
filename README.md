# semver-increment-action
[![Build](https://github.com/infra-blocks/semver-increment-action/actions/workflows/build.yml/badge.svg)](https://github.com/infra-blocks/semver-increment-action/actions/workflows/build.yml)
[![Release](https://github.com/infra-blocks/semver-increment-action/actions/workflows/release.yml/badge.svg)](https://github.com/infra-blocks/semver-increment-action/actions/workflows/release.yml)
[![Git Tag](https://github.com/infra-blocks/semver-increment-action/actions/workflows/git-tag.yml/badge.svg)](https://github.com/infra-blocks/semver-increment-action/actions/workflows/git-tag.yml)
[![Update From Template](https://github.com/infra-blocks/semver-increment-action/actions/workflows/update-from-template.yml/badge.svg)](https://github.com/infra-blocks/semver-increment-action/actions/workflows/update-from-template.yml)
[![codecov](https://codecov.io/gh/infra-blocks/semver-increment-action/graph/badge.svg?token=SIWNNFJ3WQ)](https://codecov.io/gh/infra-blocks/semver-increment-action)

A GitHub Action to increment a semantic version using predefined, well-known version bump types.

The behaviour is based on the excellent [semver](https://www.npmjs.com/search?q=semver) package. It offers the ability
to increment release versions as well as prerelease versions.

## Inputs

|       Name        | Required | Description                                                                                                                                                                                                                              |
|:-----------------:|:--------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      version      |   true   | The semantic version to increment. It must be a valid semantic version. See [here](https://semver.org/) for the definition.                                                                                                              | 
|       type        |   true   | The increment type. Valid values are: "major", "minor", "patch", "premajor" "preminorg", "prepatch", "prerelease".                                                                                                                       |
| prerelease-prefix |  false   | The prerelease prefix, such as "alpha", "beta", "crappa". This input only makes sense when using a prerelease "pre" type. It defaults to an empty string.                                                                                |
|  prerelease-base  |  false   | The reprelease base number. This is either "0", "1" or "false". False means no prerelease number is generated. When false, prerelease id must be set. This input only makes sense when using a prerelease "pre" type. It defaults to "0" |

## Outputs

|      Name      | Description                                                                              |
|:--------------:|------------------------------------------------------------------------------------------|
|    version     | The newly incremented version, as a string. Example: "1.2.4-alpha.8"                     |
|     major      | The major value of the new version. Example: "1"                                         |
|     minor      | The minor value of the new version. Example: "2"                                         |
|     patch      | The patch value of the new version. Example: "4"                                         |
|   prerelease   | The full prerelease string. Example: "alpha.8"                                           |
| prerelease-ids | A JSON stringified array of all the prerelease identifiers. Example: '["alpha", 8]'      |

## Permissions

N/A

## Usage

### Release style
```yaml
- id: semver-inc
  uses: docker://public.ecr.aws/infra-blocks/semver-increment-action:v1
  with:
    version: 1.2.3
    type: major
```

### Prerelease style

When creating a prerelease for the first time.
```yaml
- id: semver-inc
  uses: docker://public.ecr.aws/infra-blocks/semver-increment-action:v1
  with:
    version: 1.2.3
    type: prepatch
    prerelease-id: alpha # Defaults to ""
    prerelease-base: 1 # Defaults to "0"
```

When incrementing an existing prerelease version.
```yaml
- id: semver-inc
  uses: docker://public.ecr.aws/infra-blocks/semver-increment-action:v1
  with:    
    version: 1.2.4-alpha.8
    type: prerelease
    # No need to provide the other fields. The resulting version is "1.2.4-alpha.9"
```
