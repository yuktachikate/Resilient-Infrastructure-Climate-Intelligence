const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  error.statusCode = 404;
  next(error);
};

module.exports = notFoundHandler;
