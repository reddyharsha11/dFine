// server/scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Review = require('../models/Review');
const GalleryImage = require('../models/GalleryImage');
const ClinicSettings = require('../models/ClinicSettings');

const MONGODB_URI = process.env.MONGODB_URI?.trim();
if (!MONGODB_URI) {
  console.error('MONGODB_URI required');
  process.exit(1);
}

const SAMPLES = [
  {
    patientName: 'Priya S.',
    rating: 5,
    reviewText: 'Spotless clinic and gentle RCT. Dr. Srujan explained every step.',
    source: 'Google',
    isVisible: true,
  },
  {
    patientName: 'Rahul M.',
    rating: 5,
    reviewText: 'Invisible braces journey was smooth — reminders on WhatsApp helped.',
    source: 'Practo',
    isVisible: true,
  },
  {
    patientName: 'Anita K.',
    rating: 5,
    reviewText: 'Teeth whitening in one session — natural results, no sensitivity drama.',
    source: 'Google',
    isVisible: true,
  },
];

const GALLERY_SEED = [
  {
    title: 'Smile Design Planning',
    description: 'Close-up cosmetic smile planning and shade refinement.',
    imageUrl: '/gallery/smile-design.svg',
    category: 'before-after',
    sortOrder: 1,
  },
  {
    title: 'Modern Dental Operatory',
    description: 'A clean treatment room prepared for precise dental care.',
    imageUrl: '/gallery/operatory.svg',
    category: 'clinic',
    sortOrder: 2,
  },
  {
    title: 'Alignment Consultation',
    description: 'Orthodontic review for aligners and bite correction.',
    imageUrl: '/gallery/aligners.svg',
    category: 'before-after',
    beforeImageUrl: '/gallery/treatment-setup.svg',
    afterImageUrl: '/gallery/whitening.svg',
    sortOrder: 3,
  },
  {
    title: 'Dental Care Team',
    description: 'Clinical support for calm, coordinated patient care.',
    imageUrl: '/gallery/team.svg',
    category: 'team',
    sortOrder: 4,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  await ClinicSettings.findOneAndUpdate({}, {}, { upsert: true, new: true });

  const count = await Review.countDocuments();
  if (count === 0) {
    await Review.insertMany(SAMPLES);
    console.log('Seeded reviews');
  }

  const g = await GalleryImage.countDocuments();
  if (g === 0) {
    await GalleryImage.insertMany(GALLERY_SEED);
    console.log('Seeded gallery');
  }

  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (email && password) {
    const exists = await Admin.findOne({ email: email.toLowerCase() });
    if (!exists) {
      const hash = await bcrypt.hash(password, 10);
      await Admin.create({ email: email.toLowerCase(), password: hash, name: 'Clinic Admin' });
      console.log('Created admin:', email);
    } else {
      console.log('Admin already exists');
    }
  } else {
    console.log('Set ADMIN_EMAIL and ADMIN_PASSWORD to create admin');
  }

  await mongoose.disconnect();
  console.log('Done');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
