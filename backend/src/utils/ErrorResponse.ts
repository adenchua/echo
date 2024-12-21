class ErrorResponse extends Error {
  errorCode: string;
  statusCode: number;

  constructor(message: string, errorCode: string, statusCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
