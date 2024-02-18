class ApiError extends Error {
  statusCode: number;

  errorPayloads: object;

  isOperational: boolean;

  constructor(
    statusCode: number,
    message = 'Internal Server Error',
    errorPayloads: object = {},
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorPayloads = errorPayloads;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
