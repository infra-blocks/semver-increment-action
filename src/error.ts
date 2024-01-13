import VError from "verror";

<<<<<<< HEAD
export class SemverIncrementActionError extends VError {
=======
export class DockerTypescriptActionTemplateError extends VError {
>>>>>>> template/master
  constructor(
    options: Omit<VError.Options, "name">,
    message: string,
    ...params: unknown[]
  ) {
    super(
<<<<<<< HEAD
      { ...options, name: SemverIncrementActionError.name },
=======
      { ...options, name: DockerTypescriptActionTemplateError.name },
>>>>>>> template/master
      message,
      ...params,
    );
  }
}
