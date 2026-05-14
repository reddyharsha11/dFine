const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = () => process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

function getEnvAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const name = process.env.ADMIN_NAME?.trim() || 'Clinic Admin';
  if (!email || !password) return null;
  return { id: 'env-admin', email, password, name };
}

function buildToken(admin) {
  return jwt.sign({ sub: admin.id, email: admin.email }, JWT_SECRET(), {
    expiresIn: JWT_EXPIRES,
  });
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password required' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const envAdmin = getEnvAdmin();
    if (envAdmin && normalizedEmail === envAdmin.email && password === envAdmin.password) {
      const token = buildToken(envAdmin);
      res.json({
        success: true,
        data: { token, admin: { id: envAdmin.id, email: envAdmin.email, name: envAdmin.name } },
      });
      return;
    }

    const admin = await Admin.findOne({ email: normalizedEmail });
    if (!admin) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    admin.lastLogin = new Date();
    await admin.save();
    const token = buildToken(admin);
    res.json({
      success: true,
      data: { token, admin: { id: admin.id, email: admin.email, name: admin.name } },
    });
  } catch (e) {
    next(e);
  }
};

exports.me = async (req, res, next) => {
  try {
    if (req.admin.id === 'env-admin') {
      const envAdmin = getEnvAdmin();
      res.json({
        success: true,
        data: envAdmin ? { id: envAdmin.id, email: envAdmin.email, name: envAdmin.name } : null,
      });
      return;
    }

    const admin = await Admin.findById(req.admin.id).select('-password').lean();
    res.json({ success: true, data: admin });
  } catch (e) {
    next(e);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (req.admin.id === 'env-admin') {
      const envAdmin = getEnvAdmin();
      if (!envAdmin || currentPassword !== envAdmin.password) {
        res.status(400).json({ success: false, message: 'Current password incorrect' });
        return;
      }
      res.status(400).json({
        success: false,
        message: 'Env-based admin password must be changed in server/.env',
      });
      return;
    }

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    const ok = await bcrypt.compare(currentPassword, admin.password);
    if (!ok) {
      res.status(400).json({ success: false, message: 'Current password incorrect' });
      return;
    }
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
