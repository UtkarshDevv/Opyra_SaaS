const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, default: 0 }, // percentage
  completedLessons: [{ type: Number }], // lesson indices
  enrolledAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema); 