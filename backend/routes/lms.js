const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');

// Import middleware
const { auth, authorize, authLimiter } = require('../middleware/auth');
const { validate, validateQuery } = require('../middleware/validation');

// Import models for ownership checks
const Course = require('../models/Course');
const User = require('../models/User');

// ===== AUTHENTICATION ROUTES =====
router.post('/auth/register', authLimiter, validate('userRegister'), authController.register);
router.post('/auth/login', authLimiter, validate('userLogin'), authController.login);
router.post('/auth/forgot-password', authLimiter, authController.forgotPassword);
router.post('/auth/reset-password', authLimiter, authController.resetPassword);

// Protected auth routes
router.get('/auth/me', auth, authController.getMe);
router.put('/auth/profile', auth, validate('userUpdate'), authController.updateProfile);
router.put('/auth/change-password', auth, authController.changePassword);
router.post('/auth/logout', auth, authController.logout);
router.post('/auth/refresh', auth, authController.refreshToken);

// ===== COURSE ROUTES =====
// Public routes
router.get('/courses', validateQuery('pagination'), courseController.getCourses);
router.get('/courses/:id', courseController.getCourse);
router.get('/courses/categories', courseController.getCategories);

// Protected routes - Instructor/Admin only
router.post('/courses', 
  auth, 
  authorize('instructor', 'admin'), 
  validate('courseCreate'), 
  courseController.createCourse
);

router.put('/courses/:id', 
  auth, 
  authorize('instructor', 'admin'), 
  validate('courseUpdate'), 
  courseController.updateCourse
);

router.delete('/courses/:id', 
  auth, 
  authorize('instructor', 'admin'), 
  courseController.deleteCourse
);

// Instructor specific routes
router.get('/courses/instructor/my-courses', 
  auth, 
  authorize('instructor', 'admin'), 
  validateQuery('pagination'), 
  courseController.getMyCourses
);

router.get('/courses/:id/analytics', 
  auth, 
  authorize('instructor', 'admin'), 
  courseController.getCourseAnalytics
);

router.post('/courses/:id/thumbnail', 
  auth, 
  authorize('instructor', 'admin'), 
  courseController.uploadThumbnail
);

// ===== USER MANAGEMENT ROUTES =====
// Get all users (Admin only)
router.get('/users', auth, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    
    let query = User.find({}, '-password');
    
    if (role) {
      query = query.find({ role });
    }
    
    if (search) {
      query = query.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      });
    }
    
    const skip = (page - 1) * limit;
    const users = await query.skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 });
    const total = await User.countDocuments(query.getQuery());
    
    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password')
      .populate('enrolledCourses.course', 'title thumbnail price')
      .populate('createdCourses', 'title thumbnail price status');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user (Admin or self)
router.put('/users/:id', auth, validate('userUpdate'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user can update (admin or self)
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ENROLLMENT ROUTES =====
// Enroll in a course
router.post('/enroll', auth, validate('enrollmentCreate'), async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    // Check if already enrolled
    const existingEnrollment = await require('../models/Enrollment').findOne({
      user: req.user._id,
      course: courseId
    });
    
    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }
    
    // Create enrollment
    const enrollment = await require('../models/Enrollment').create({
      user: req.user._id,
      course: courseId,
      enrolledAt: new Date(),
      status: 'active'
    });
    
    // Update user's enrolled courses
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enrolledCourses: { course: courseId, enrolledAt: new Date() } }
    });
    
    res.status(201).json({ enrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user enrollments
router.get('/enrollments', auth, async (req, res) => {
  try {
    const enrollments = await require('../models/Enrollment').find({ user: req.user._id })
      .populate('course', 'title thumbnail price instructor')
      .sort({ enrolledAt: -1 });
    
    res.json({ enrollments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update enrollment progress
router.put('/enrollments/:id/progress', auth, validate('progressUpdate'), async (req, res) => {
  try {
    const { progress, completedLessons } = req.body;
    
    const enrollment = await require('../models/Enrollment').findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    
    enrollment.progress = progress;
    if (completedLessons) {
      enrollment.completedLessons = completedLessons;
    }
    enrollment.lastAccessed = new Date();
    
    await enrollment.save();
    
    res.json({ enrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== DASHBOARD ROUTES =====
// Get dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    let dashboardData = {};
    
    if (req.user.role === 'admin') {
      // Admin dashboard
      const totalUsers = await User.countDocuments();
      const totalCourses = await Course.countDocuments();
      const totalEnrollments = await require('../models/Enrollment').countDocuments();
      
      dashboardData = {
        totalUsers,
        totalCourses,
        totalEnrollments,
        recentUsers: await User.find().sort({ createdAt: -1 }).limit(5).select('-password'),
        recentCourses: await Course.find().sort({ createdAt: -1 }).limit(5)
      };
    } else if (req.user.role === 'instructor') {
      // Instructor dashboard
      const myCourses = await Course.countDocuments({ instructor: req.user._id });
      const totalStudents = await require('../models/Enrollment').countDocuments({
        course: { $in: await Course.find({ instructor: req.user._id }).select('_id') }
      });
      
      dashboardData = {
        myCourses,
        totalStudents,
        recentCourses: await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 }).limit(5)
      };
    } else {
      // Student dashboard
      const enrolledCourses = await require('../models/Enrollment').countDocuments({ user: req.user._id });
      const completedCourses = await require('../models/Enrollment').countDocuments({
        user: req.user._id,
        'progress.progress': 100
      });
      
      dashboardData = {
        enrolledCourses,
        completedCourses,
        recentEnrollments: await require('../models/Enrollment').find({ user: req.user._id })
          .populate('course', 'title thumbnail')
          .sort({ enrolledAt: -1 })
          .limit(5)
      };
    }
    
    res.json({ dashboardData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 