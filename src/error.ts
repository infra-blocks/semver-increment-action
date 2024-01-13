import VError from "verror";

export class SemverIncrementActionError extends VError {
  constructor(
    options: Omit<VError.Options, "name">,
    message: string,
    ...params: unknown[]
  ) {
    super(
      { ...options, name: SemverIncrementActionError.name },
      message,
      ...params,
    );
  }
}
