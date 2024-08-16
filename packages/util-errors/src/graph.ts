export class InternalServerError extends Error {
  traceId: string;

  constructor(traceId: string) {
    super();
    this.name = "InternalServerError";
    this.message =
      "An unhandled error has occurred, please provide the attached traceId when you request support.";
    this.traceId = traceId;
  }
}
