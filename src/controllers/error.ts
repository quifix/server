export default class ApiError {
  code: number;
  message: string;

  /**
   *
   * @param code status of the error that needs to be returned.
   * @param message description summary of the encounted error.
   */
  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  /**
   *
   * @param msg
   * @returns a 400 error Bad request.
   */
  static badRequest(msg: string): ApiError {
    return new ApiError(400, msg);
  }

  /**
   *
   * @param msg
   * @returns a 403 error Invalid credentials
   */
  static invalidCredentials(msg: string): ApiError {
    return new ApiError(403, msg);
  }

  /**
   *
   * @param msg
   * @returns a 404 Ressource not found or route not found.
   */
  static notFound(msg: string): ApiError {
    return new ApiError(404, msg);
  }
  /**
   *
   * @param msg
   * @returns a 422 validation error from validation middleware.
   */
  static validationError(msg: string): ApiError {
    return new ApiError(422, msg);
  }

  /**
   *
   * @param msg
   * @returns a 500 error Internal error.
   */
  static internal(msg: string): ApiError {
    return new ApiError(500, msg);
  }
}
