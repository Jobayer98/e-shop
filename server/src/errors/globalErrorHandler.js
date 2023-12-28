const globalErrorHandler = (err, req, res, next) => {
  // console.error(err.message, err.statusCode);

  res.status(500).json({
    status: 'failed',
    error: err.message || 'Internal Server Error',
  });
};

module.exports = globalErrorHandler;
