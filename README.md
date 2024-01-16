# semver-increment-action

A GitHub Action to increment a semantic version using predefined, well-known version bump types.

The behaviour is based on the excellent [semver](https://www.npmjs.com/search?q=semver) package. It offers the ability
to increment release versions as well as prerelease versions.

## Inputs

|      Name      | Required | Description                                                                                                                                                                                                                             |
|:---------------:|:--------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     version     |   true   | The semantic version to increment. It must be a valid semantic version. See [here](https://semver.org/) for the definition.                                                                                                             | 
|      type       |   true   | The increment type. Valid values are: "major", "minor", "patch", "premajor" "preminorg", "prepatch", "prerelease".                                                                                                                      |
| prerelease-id   |  false   | The prerelease identifier, such as "alpha", "beta", "crappa". This input only makes sense when using a prerelease "pre" type. It defaults to an empty string.                                                                           |
| prerelease-base |  false   | The reprelease base number. This is either "0", "1" or "false". False means no prerelease number is generated. When false, prerelease id must be set. This input only makes sense when using a prerelease "pre" type. It defaults to "0" |

## Outputs

|    Name        | Description                                                                              |
|:--------------:|------------------------------------------------------------------------------------------|
|    version     | The newly incremented version, as a string. Example: "1.2.4-alpha.8"                     |
|     major      | The major value of the new version. Example: "1"                                         |
|     minor      | The minor value of the new version. Example: "2"                                         |
|     patch      | The patch value of the new version. Example: "4"                                         |
|   prerelease   | The full prerelease string. Example: "alpha.8"                                           |
| prerelease-ids | A JSON stringified array of all the prerelease identifiers. Example: '["alpha", 8]'      |

## Permissions

|     Scope     | Level | Reason   |
|:-------------:|:-----:|----------|
| pull-requests | read  | Because. |

## Usage

### Release style
```yaml
- id: semver-inc
  uses: docker://public.ecr.aws/infrastructure-blocks/semver-increment-action:v1
  with:
    version: 1.2.3
    type: major
```

### Prerelease style

When creating a prerelease for the first time.
```yaml
- id: semver-inc
  uses: docker://public.ecr.aws/infrastructure-blocks/semver-increment-action:v1
  with:
    version: 1.2.3
    type: prepatch
    prerelease-id: alpha # Defaults to ""
    prerelease-base: 1 # Defaults to "0"
```

When incrementing an existing prerelease version.
```yaml
- id: semver-inc
  uses: docker://public.ecr.aws/infrastructure-blocks/semver-increment-action:v1
  with:    
    version: 1.2.4-alpha.8
    type: prerelease
    # No need to provide the other fields. The resulting version is "1.2.4-alpha.9"
```

## Releasing

The CI fully automates the release process. The only manual intervention required is to assign a semantic
versioning label to the pull request before merging (this is a required check). Upon merging, the
release process kicks off. It manages a set of semantic versioning git tags,
as described [here](https://github.com/infrastructure-blocks/git-tag-semver-action).

Upon tagging the default branch, jobs to tag docker images with the same tags will kick off.
