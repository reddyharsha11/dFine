// server/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }
  if (err.name === 'ValidationError') {
    const first = Object.values(err.errors || {})[0];
    res.status(400).json({ success: false, message: first?.message || 'Validation error' });
    return;
  }
  if (err.name === 'CastError') {
    res.status(400).json({ success: false, message: 'Invalid id' });
    return;
  }
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  res.status(status).json({ success: false, message });
}

module.exports = errorHandler;
