class ErrorResponse extends Error {
  constructor(message, errorCode, statusCode) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
