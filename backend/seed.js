const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Teacher = require('./models/Teacher');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const run = async () => {
  const hashed = await bcrypt.hash('jade123', 10);

  // Sem 2: Students 1–10
  const studentsSem2 = Array.from({ length: 10 }, (_, i) => ({
    name: `Student ${i + 1}`,
    usn: `1MS22CS10${i + 1}`,
    test1: Math.floor(Math.random() * 31),
    test2: Math.floor(Math.random() * 31),
    external: Math.floor(Math.random() * 21)
  }));

  // Sem 5: Students A–J
  const studentsSem5 = Array.from({ length: 10 }, (_, i) => ({
    name: `Student ${String.fromCharCode(65 + i)}`,
    usn: `1MS22CS50${i + 1}`,
    test1: Math.floor(Math.random() * 31),
    test2: Math.floor(Math.random() * 31),
    external: Math.floor(Math.random() * 21)
  }));

  await Teacher.deleteMany({ email: 'jade@school.com' });

  const teacher = new Teacher({
    name: 'Jade',
    email: 'jade@school.com',
    password: hashed,
    subjects: [
      {
        name: 'Chemistry',
        semester: '2',
        students: studentsSem2
      },
      {
        name: 'Java',
        semester: '5',
        students: studentsSem5
      }
    ]
  });

  await teacher.save();
  console.log('✅ Teacher with proper USNs and external marks inserted');
  process.exit();
};

run();
