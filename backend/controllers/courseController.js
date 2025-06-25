const Course = require('../models/Course');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const { 
  asyncHandler, 
  successResponse, 
  NotFoundError, 
  AuthorizationError,
  paginateResults,
  createSearchQuery
} = require('../utils/errorHandler');

// @desc    Get all courses with pagination and search
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', q, category, priceMin, priceMax, status } = req.query;

  // Build query
  let query = Course.find({ status: 'published' });

  // Search functionality
  if (q) {
    const searchQuery = createSearchQuery(q, ['title', 'description', 'category']);
    query = query.find(searchQuery);
  }

  // Filter by category
  if (category) {
    query = query.find({ category });
  }

  // Filter by price range
  if (priceMin || priceMax) {
    const priceFilter = {};
    if (priceMin) priceFilter.$gte = parseFloat(priceMin);
    if (priceMax) priceFilter.$lte = parseFloat(priceMax);
    query = query.find({ price: priceFilter });
  }

  // Filter by status (admin only)
  if (status && req.user?.role === 'admin') {
    query = query.find({ status });
  }

  // Populate instructor info
  query = query.populate('instructor', 'name avatar');

  // Sort
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  query = query.sort(sortOptions);

  // Paginate
  const paginatedQuery = paginateResults(query, parseInt(page), parseInt(limit));

  // Execute query
  const courses = await paginatedQuery;
  const total = await Course.countDocuments(query.getQuery());

  // Calculate pagination info
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  successResponse(res, {
    courses,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit),
      hasNextPage,
      hasPrevPage
    }
  }, 'Courses retrieved successfully');
});

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('instructor', 'name avatar bio')
    .populate('lessons', 'title duration order')
    .populate('quizzes', 'title timeLimit passingScore');

  if (!course) {
    throw new NotFoundError('Course');
  }

  // Check if user is enrolled (if authenticated)
  let isEnrolled = false;
  let userProgress = null;

  if (req.user) {
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: course._id
    }).populate('progress');

    if (enrollment) {
      isEnrolled = true;
      userProgress = enrollment.progress;
    }
  }

  successResponse(res, {
    course,
    isEnrolled,
    userProgress
  }, 'Course retrieved successfully');
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Instructor/Admin)
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, price, duration, thumbnail, status } = req.body;

  const course = await Course.create({
    title,
    description,
    category,
    price: price || 0,
    duration: duration || '0 weeks',
    thumbnail,
    status: status || 'published',
    instructor: req.user._id
  });

  const populatedCourse = await Course.findById(course._id)
    .populate('instructor', 'name avatar');

  successResponse(res, { course: populatedCourse }, 'Course created successfully', 201);
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Course owner or Admin)
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new NotFoundError('Course');
  }

  // Check ownership
  if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AuthorizationError('You can only update your own courses');
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('instructor', 'name avatar');

  successResponse(res, { course: updatedCourse }, 'Course updated successfully');
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Course owner or Admin)
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new NotFoundError('Course');
  }

  // Check ownership
  if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AuthorizationError('You can only delete your own courses');
  }

  // Check if course has enrollments
  const enrollmentCount = await Enrollment.countDocuments({ course: course._id });
  if (enrollmentCount > 0) {
    throw new AuthorizationError('Cannot delete course with active enrollments');
  }

  await Course.findByIdAndDelete(req.params.id);

  successResponse(res, {}, 'Course deleted successfully');
});

// @desc    Get instructor's courses
// @route   GET /api/courses/instructor/my-courses
// @access  Private (Instructor)
const getMyCourses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  let query = Course.find({ instructor: req.user._id });

  if (status) {
    query = query.find({ status });
  }

  query = query.sort({ createdAt: -1 });

  const paginatedQuery = paginateResults(query, parseInt(page), parseInt(limit));
  const courses = await paginatedQuery;
  const total = await Course.countDocuments({ instructor: req.user._id });

  const totalPages = Math.ceil(total / limit);

  successResponse(res, {
    courses,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  }, 'Your courses retrieved successfully');
});

// @desc    Get course analytics
// @route   GET /api/courses/:id/analytics
// @access  Private (Course owner or Admin)
const getCourseAnalytics = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new NotFoundError('Course');
  }

  // Check ownership
  if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AuthorizationError('You can only view analytics for your own courses');
  }

  // Get enrollment statistics
  const totalEnrollments = await Enrollment.countDocuments({ course: course._id });
  const activeEnrollments = await Enrollment.countDocuments({ 
    course: course._id, 
    status: 'active' 
  });

  // Get completion statistics
  const completedEnrollments = await Enrollment.countDocuments({
    course: course._id,
    'progress.progress': 100
  });

  // Get revenue (if course is paid)
  const revenue = course.price > 0 ? totalEnrollments * course.price : 0;

  // Get recent enrollments
  const recentEnrollments = await Enrollment.find({ course: course._id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);

  successResponse(res, {
    analytics: {
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      completionRate: totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0,
      revenue,
      recentEnrollments
    }
  }, 'Course analytics retrieved successfully');
});

// @desc    Upload course thumbnail
// @route   POST /api/courses/:id/thumbnail
// @access  Private (Course owner or Admin)
const uploadThumbnail = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new NotFoundError('Course');
  }

  // Check ownership
  if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AuthorizationError('You can only update thumbnails for your own courses');
  }

  // In production, you would handle file upload here
  // For now, we'll just update the thumbnail URL
  const { thumbnailUrl } = req.body;

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    { thumbnail: thumbnailUrl },
    { new: true }
  ).populate('instructor', 'name avatar');

  successResponse(res, { course: updatedCourse }, 'Course thumbnail updated successfully');
});

// @desc    Get course categories
// @route   GET /api/courses/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Course.distinct('category');
  
  successResponse(res, { categories }, 'Categories retrieved successfully');
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getMyCourses,
  getCourseAnalytics,
  uploadThumbnail,
  getCategories
}; 