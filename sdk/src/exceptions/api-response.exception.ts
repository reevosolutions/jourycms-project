export default class ApiResponseError extends Error {

  public status: number;
  public backend_stack: string[] | string | undefined;
  public fields: Levelup.CMS.V1.Utils.Api.Response.ErrorFields | undefined;
  constructor(error: Levelup.CMS.V1.Utils.Api.Response.Error) {
    super(error.message);

    this.name = error.name || this.constructor.name;
    this.status = error.status || 500;
    this.backend_stack = error.stack;
    this.fields = error.fields;


    Object.setPrototypeOf(this, ApiResponseError.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      status: this.status,
      fields: this.fields,
      backend_stack: this.backend_stack,
    };
  }
}