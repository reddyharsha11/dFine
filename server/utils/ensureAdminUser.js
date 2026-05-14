const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const name = process.env.ADMIN_NAME?.trim() || 'Clinic Admin';

  if (!email || !password) {
    console.log('[admin] Skipped bootstrap (ADMIN_EMAIL or ADMIN_PASSWORD missing)');
    return;
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    // Check if password in .env has changed and update it
    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) {
      const newHash = await bcrypt.hash(password, 10);
      existing.password = newHash;
      await existing.save();
      console.log(`[admin] Password updated for ${email}`);
    }
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hash, name });
  console.log(`[admin] Bootstrapped admin user for ${email}`);
}

module.exports = { ensureAdminUser };
