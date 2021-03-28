export default class ApiError {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg: string): ApiError {
    return new ApiError(400, msg);
  }

  static invalidCredentials(msg: string): ApiError {
    return new ApiError(403, msg);
  }

  static notFound(msg: string): ApiError {
    return new ApiError(404, msg);
  }

  static validationError(msg: string): ApiError {
    return new ApiError(422, msg);
  }

  static internal(msg: string): ApiError {
    return new ApiError(500, msg);
  }
}
