// LMS API Service
import { getLmsApiUrl, API_CONFIG } from '../constants/config';

// Use centralized configuration
const BASE_URL = getLmsApiUrl();

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

// Helper function to handle network errors
const handleNetworkError = (error) => {
  console.error('Network error:', error);
  if (error.message.includes('fetch')) {
    throw new Error('Unable to connect to backend server. Please check if the server is running.');
  }
  throw error;
};

// Helper function to make API calls with timeout and retry
const apiCall = async (url, options = {}, retries = 0) => {
  try {
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), API_CONFIG.TIMEOUT);
    });
    
    // Create the fetch promise
    const fetchPromise = fetch(url, options);
    
    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    return response;
  } catch (error) {
    if (error.message.includes('timeout')) {
      throw new Error('Request timeout');
    }
    
    if (retries < API_CONFIG.MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
      return apiCall(url, options, retries + 1);
    }
    
    throw error;
  }
};

// ===== AUTHENTICATION API =====

export const authApi = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await apiCall(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return handleResponse(response);
    } catch (error) {
      handleNetworkError(error);
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await apiCall(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return handleResponse(response);
    } catch (error) {
      handleNetworkError(error);
    }
  },

  // Get current user profile
  getMe: async (token) => {
    try {
      const response = await apiCall(`${BASE_URL}/auth/me`, {
        method: 'GET',
        headers: getAuthHeaders(token)
      });
      return handleResponse(response);
    } catch (error) {
      handleNetworkError(error);
    }
  },

  // Update user profile
  updateProfile: async (userData, token) => {
    try {
      const response = await apiCall(`${BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(userData)
      });
      return handleResponse(response);
    } catch (error) {
      handleNetworkError(error);
    }
  },

  // Change password
  changePassword: async (passwordData, token) => {
    try {
      const response = await apiCall(`${BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(passwordData)
      });
      return handleResponse(response);
    } catch (error) {
      handleNetworkError(error);
    }
  },

  // Logout
  logout: async (token) => {
    try {
      const response = await apiCall(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(token)
      });
      return handleResponse(response);
    } catch (error) {
      handleNetworkError(error);
    }
  }
};

// ===== COURSES API =====

export const coursesApi = {
  // Get all courses with pagination and filters
  getCourses: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${BASE_URL}/courses?${queryParams}` : `${BASE_URL}/courses`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  },

  // Get single course by ID
  getCourse: async (courseId) => {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  },

  // Create new course
  createCourse: async (courseData, token) => {
    const response = await fetch(`${BASE_URL}/courses`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(courseData)
    });
    return handleResponse(response);
  },

  // Update course
  updateCourse: async (courseId, courseData, token) => {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(courseData)
    });
    return handleResponse(response);
  },

  // Delete course
  deleteCourse: async (courseId, token) => {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // Get instructor's courses
  getMyCourses: async (params = {}, token) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${BASE_URL}/courses/instructor/my-courses?${queryParams}` : `${BASE_URL}/courses/instructor/my-courses`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // Get course analytics
  getCourseAnalytics: async (courseId, token) => {
    const response = await fetch(`${BASE_URL}/courses/${courseId}/analytics`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // Upload course thumbnail
  uploadThumbnail: async (courseId, thumbnailUrl, token) => {
    const response = await fetch(`${BASE_URL}/courses/${courseId}/thumbnail`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ thumbnailUrl })
    });
    return handleResponse(response);
  },

  // Get course categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/courses/categories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  }
};

// ===== USER MANAGEMENT API =====

export const usersApi = {
  // Get all users (Admin only)
  getUsers: async (params = {}, token) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${BASE_URL}/users?${queryParams}` : `${BASE_URL}/users`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // Get user by ID
  getUser: async (userId, token) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // Update user
  updateUser: async (userId, userData, token) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Delete user (Admin only)
  deleteUser: async (userId, token) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  }
};

// ===== ENROLLMENT API =====

export const enrollmentApi = {
  // Enroll in a course
  enroll: async (courseId, token) => {
    const response = await fetch(`${BASE_URL}/enroll`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ courseId })
    });
    return handleResponse(response);
  },

  // Get user enrollments
  getEnrollments: async (token) => {
    const response = await fetch(`${BASE_URL}/enrollments`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // Update enrollment progress
  updateProgress: async (enrollmentId, progressData, token) => {
    const response = await fetch(`${BASE_URL}/enrollments/${enrollmentId}/progress`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(progressData)
    });
    return handleResponse(response);
  }
};

// ===== DASHBOARD API =====

export const dashboardApi = {
  // Get dashboard data
  getDashboard: async (token) => {
    const response = await fetch(`${BASE_URL}/dashboard`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  }
};

// ===== UTILITY FUNCTIONS =====

// Check if backend is reachable
export const checkBackendConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL.replace('/api/lms', '')}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.ok;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
};

// Get API base URL for configuration
export const getApiBaseUrl = () => BASE_URL;

// Set API base URL (useful for switching environments)
export const setApiBaseUrl = (newUrl) => {
  BASE_URL = newUrl;
}; 