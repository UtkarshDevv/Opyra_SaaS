const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { auth, authorize, checkOwnership } = require('../middleware/auth');
const { validate, validateQuery } = require('../middleware/validation');
const Course = require('../models/Course');

// Public routes
router.get('/', validateQuery('pagination'), courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.get('/categories', courseController.getCategories);

// Protected routes - Instructor/Admin only
router.post('/', 
  auth, 
  authorize('instructor', 'admin'), 
  validate('courseCreate'), 
  courseController.createCourse
);

router.put('/:id', 
  auth, 
  checkOwnership(Course), 
  validate('courseUpdate'), 
  courseController.updateCourse
);

router.delete('/:id', 
  auth, 
  checkOwnership(Course), 
  courseController.deleteCourse
);

// Instructor routes
router.get('/instructor/my-courses', 
  auth, 
  authorize('instructor', 'admin'), 
  validateQuery('pagination'), 
  courseController.getMyCourses
);

router.get('/:id/analytics', 
  auth, 
  checkOwnership(Course), 
  courseController.getCourseAnalytics
);

router.post('/:id/thumbnail', 
  auth, 
  checkOwnership(Course), 
  courseController.uploadThumbnail
);

module.exports = router; 