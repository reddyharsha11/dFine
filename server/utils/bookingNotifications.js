const { sendMail } = require('./sendMail');

function formatBookingLines(appointment) {
  return [
    `Patient: ${appointment.name}`,
    `Phone: ${appointment.phone}`,
    `Email: ${appointment.email || 'Not provided'}`,
    `Service: ${appointment.service}`,
    `Date: ${new Date(appointment.date).toLocaleString('en-IN')}`,
    `Time Slot: ${appointment.timeSlot}`,
    `WhatsApp Reminder: ${appointment.wantsWhatsApp ? 'Yes' : 'No'}`,
    `Message: ${appointment.message || 'No additional notes'}`,
  ];
}

function buildAdminMessage(appointment) {
  return ['New dFine booking received', ...formatBookingLines(appointment)].join('\n');
}

function buildPatientMessage(appointment) {
  return [
    `Hi ${appointment.name},`,
    '',
    `We received your appointment request for ${appointment.service}.`,
    `Preferred date: ${new Date(appointment.date).toLocaleDateString('en-IN')}`,
    `Preferred time: ${appointment.timeSlot}`,
    '',
    `Our team will contact you on ${appointment.phone} shortly.`,
    '',
    'Thank you,',
    'dFine Dental & Health Care',
  ].join('\n');
}

async function sendAdminEmail(appointment) {
  const to = process.env.ALERT_EMAIL?.trim() || process.env.ADMIN_EMAIL?.trim();
  if (!to) {
    console.log('[booking-email] Skipped admin email (ALERT_EMAIL or ADMIN_EMAIL missing)');
    return { skipped: true };
  }

  return sendMail({
    to,
    subject: `New booking: ${appointment.name}`,
    text: buildAdminMessage(appointment),
    html: buildAdminMessage(appointment).replace(/\n/g, '<br />'),
  });
}

async function sendPatientEmail(appointment) {
  if (!appointment.email) {
    return { skipped: true };
  }

  return sendMail({
    to: appointment.email,
    subject: 'dFine Dental appointment received',
    text: buildPatientMessage(appointment),
    html: buildPatientMessage(appointment).replace(/\n/g, '<br />'),
  });
}

async function sendWhatsAppAlert(appointment) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const to = (process.env.WHATSAPP_TO_NUMBER?.trim() || '').replace(/\D/g, '');

  if (!token || !phoneNumberId || !to) {
    console.log('[booking-whatsapp] Skipped (missing WhatsApp Cloud API env)');
    return { skipped: true };
  }

  const bodyText = buildAdminMessage(appointment);
  const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: bodyText },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`WhatsApp alert failed: ${details}`);
  }

  return { sent: true };
}

async function sendSmsAlert(appointment) {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const token = process.env.TWILIO_AUTH_TOKEN?.trim();
  const from = process.env.TWILIO_FROM_NUMBER?.trim();
  const to = process.env.TWILIO_TO_NUMBER?.trim();

  if (!sid || !token || !from || !to) {
    console.log('[booking-sms] Skipped (missing Twilio env)');
    return { skipped: true };
  }

  const body = new URLSearchParams({
    To: to,
    From: from,
    Body: buildAdminMessage(appointment),
  });

  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`SMS alert failed: ${details}`);
  }

  return { sent: true };
}

async function notifyBooking(appointment) {
  const tasks = [
    sendAdminEmail(appointment).catch((error) => ({ error: error.message })),
    sendPatientEmail(appointment).catch((error) => ({ error: error.message })),
    sendWhatsAppAlert(appointment).catch((error) => ({ error: error.message })),
    sendSmsAlert(appointment).catch((error) => ({ error: error.message })),
  ];

  return Promise.all(tasks);
}

module.exports = { notifyBooking };
