const databaseErrorHandler = (err, req, res, next) => {
  // console.error('Database error:', err);

  // Check for specific database error codes and handle them accordingly
  if (err.code === 11000) {
    // Duplicate key error (MongoDB)
    return res.status(400).json({
      status: 'failed',
      error: 'Duplicate key violation',
    });
  }

  // Handle other database errors as needed

  next(err);
};

module.exports = databaseErrorHandler;
