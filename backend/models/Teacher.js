const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  usn: String,
  test1: Number,
  test2: Number,
  external: Number
});

const subjectSchema = new mongoose.Schema({
  name: String,
  semester: String,
  students: [studentSchema]
});

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subjects: [subjectSchema]
});

module.exports = mongoose.model('Teacher', teacherSchema);
