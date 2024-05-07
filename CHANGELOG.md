# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2024-04-09

### Changed

- The action image is now built using the `public.ecr.aws/infrastructure-blocks/docker-typescript-action-base`
  base image.

## [1.0.4] - 2024-01-21

### Changed

- Bumped the `@infra-blocks/github-actions` dependency to `0.2.1`.

## [1.0.3] - 2024-01-21

### Fixed

- Changed the `prerelease-id` input name to `prerelease-prefix`. Normally, that would be a major change,
but it was truly a leftover hanging thread from previous changes.

## [1.0.2] - 2024-01-16

### Added

- Small documentation snippet about action permissions.

## [1.0.1] - 2024-01-13

### Changed

- Bumped the `@infra-blocks/github-actions` dependency to `0.2.0`.

## [1.0.0] - 2024-01-13

### Added

- First release!

[1.0.5]: https://github.com/infrastructure-blocks/semver-increment-action/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/infrastructure-blocks/semver-increment-action/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/infrastructure-blocks/semver-increment-action/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/infrastructure-blocks/semver-increment-action/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/infrastructure-blocks/semver-increment-action/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/infrastructure-blocks/semver-increment-action/releases/tag/v1.0.0
