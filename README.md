# docker-action-template

A template repository for GitHub Actions hosted as docker images on registries.

## Instantiation checklist

- Remove the [trigger update from template workflow](.github/workflows/trigger-update-from-template.yml)
- Rename the docker image/container in [docker compose file](./docker/docker-compose.yml)
- Rename the header of this document to match the repository
- Replace this section of this document to include a description of the new package
