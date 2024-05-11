const errorHandler = (error, req, res, next) => {
  const errorStatusCode = error.statusCode || 500;
  const errorMessage = error.message || "Something went wrong";
  const errorCode = error.errorCode || "INTERNAL_SERVER_ERROR";
  const errorResponse = {
    timestamp: new Date().toISOString(),
    statusCode: errorStatusCode,
    errorCode,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? error.stack : {}, // do not send sensitive information to clients in prod
  };

  console.error(error);

  res.status(errorStatusCode).send({
    status: "error",
    error: errorResponse,
  });
};

export default errorHandler;
