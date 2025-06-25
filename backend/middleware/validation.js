const Joi = require('joi');

// Validation schemas
const schemas = {
  // User validation
  userRegister: Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).max(128).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'any.required': 'Password is required'
    }),
    role: Joi.string().valid('student', 'instructor', 'admin').default('student').messages({
      'any.only': 'Role must be student, instructor, or admin'
    })
  }),

  userLogin: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required'
    })
  }),

  userUpdate: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    avatar: Joi.string().uri().optional(),
    bio: Joi.string().max(500).optional()
  }),

  // Course validation
  courseCreate: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.min': 'Course title must be at least 3 characters long',
      'string.max': 'Course title cannot exceed 100 characters',
      'any.required': 'Course title is required'
    }),
    description: Joi.string().min(10).max(1000).required().messages({
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Description is required'
    }),
    category: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Category must be at least 2 characters long',
      'string.max': 'Category cannot exceed 50 characters',
      'any.required': 'Category is required'
    }),
    price: Joi.number().min(0).max(9999).default(0).messages({
      'number.min': 'Price cannot be negative',
      'number.max': 'Price cannot exceed 9999'
    }),
    duration: Joi.string().max(50).default('0 weeks'),
    thumbnail: Joi.string().uri().optional(),
    status: Joi.string().valid('draft', 'published').default('published')
  }),

  courseUpdate: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().min(10).max(1000).optional(),
    category: Joi.string().min(2).max(50).optional(),
    price: Joi.number().min(0).max(9999).optional(),
    duration: Joi.string().max(50).optional(),
    thumbnail: Joi.string().uri().optional(),
    status: Joi.string().valid('draft', 'published').optional()
  }),

  // Lesson validation
  lessonCreate: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    videoUrl: Joi.string().uri().optional(),
    duration: Joi.number().min(0).max(480).default(0), // max 8 hours
    order: Joi.number().min(1).required()
  }),

  // Quiz validation
  quizCreate: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    course: Joi.string().required(),
    timeLimit: Joi.number().min(5).max(180).default(30), // 5 min to 3 hours
    passingScore: Joi.number().min(0).max(100).default(70),
    questions: Joi.array().items(
      Joi.object({
        question: Joi.string().min(5).max(500).required(),
        options: Joi.array().items(Joi.string().min(1).max(200)).min(2).max(6).required(),
        correctAnswer: Joi.number().min(0).required(),
        points: Joi.number().min(1).max(10).default(1)
      })
    ).min(1).required()
  }),

  // Live class validation
  liveClassCreate: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    course: Joi.string().required(),
    scheduledAt: Joi.date().greater('now').required(),
    duration: Joi.number().min(15).max(480).default(60), // 15 min to 8 hours
    meetingUrl: Joi.string().uri().optional()
  }),

  // Enrollment validation
  enrollmentCreate: Joi.object({
    courseId: Joi.string().required()
  }),

  // Progress update validation
  progressUpdate: Joi.object({
    progress: Joi.number().min(0).max(100).required(),
    completedLessons: Joi.array().items(Joi.number().min(0)).optional()
  }),

  // Pagination validation
  pagination: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    sortBy: Joi.string().valid('createdAt', 'title', 'price', 'rating').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
  }),

  // Search validation
  search: Joi.object({
    q: Joi.string().min(1).max(100).optional(),
    category: Joi.string().optional(),
    priceMin: Joi.number().min(0).optional(),
    priceMax: Joi.number().min(0).optional(),
    status: Joi.string().valid('draft', 'published').optional()
  })
};

// Validation middleware factory
const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return res.status(500).json({ 
        error: 'Validation schema not found',
        code: 'VALIDATION_SCHEMA_ERROR'
      });
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: errors
      });
    }

    req.body = value;
    next();
  };
};

// Query validation middleware
const validateQuery = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return res.status(500).json({ 
        error: 'Validation schema not found',
        code: 'VALIDATION_SCHEMA_ERROR'
      });
    }

    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: 'Query validation failed',
        code: 'QUERY_VALIDATION_ERROR',
        details: errors
      });
    }

    req.query = value;
    next();
  };
};

module.exports = {
  validate,
  validateQuery,
  schemas
}; 