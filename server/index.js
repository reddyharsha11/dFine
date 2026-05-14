// server/index.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { ensureAdminUser } = require('./utils/ensureAdminUser');

const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();

void connectDB().then((conn) => {
  if (conn) {
    return ensureAdminUser().catch((error) => {
      console.error('[admin] Bootstrap failed:', error.message);
    });
  }
  return null;
});

const clientOrigins = [
  process.env.CLIENT_URL?.trim(),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || clientOrigins.includes(origin)) {
        cb(null, true);
        return;
      }
      cb(null, false);
    },
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use('/api', limiter);

app.get('/api/health', (req, res) => {
  const uriConfigured = Boolean(process.env.MONGODB_URI?.trim());
  res.json({
    status: 'OK',
    mongodb: uriConfigured ? mongoose.connection.readyState === 1 : null,
  });
});

app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);

app.use(errorHandler);

const distDir = path.join(__dirname, '../client/dist');
const distIndex = path.join(distDir, 'index.html');
if (fs.existsSync(distIndex)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next();
      return;
    }
    if (req.path.startsWith('/api')) {
      next();
      return;
    }
    res.sendFile(distIndex);
  });
}

const PORT = Number(process.env.PORT) || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `Port ${PORT} is already in use (another server instance is probably still running). ` +
          'Close that terminal, stop the other process, or set PORT to a free port in server/.env. ' +
          'On Windows: netstat -ano | findstr :' +
          PORT
      );
      process.exit(1);
      return;
    }
    console.error(err);
    process.exit(1);
  });
}

module.exports = app;
