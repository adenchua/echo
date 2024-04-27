const errorHandler = (error, req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Something went wrong";
  res.status(errorStatus).send({
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  });
};

export default errorHandler;
