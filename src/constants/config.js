// API Configuration
export const API_CONFIG = {
  // Backend URL - change this based on your environment
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  
  // API endpoints
  ENDPOINTS: {
    AUTH: '/api/auth',
    LMS: '/api/lms',
    ACCOUNTING: '/api/accounting'
  },
  
  // Timeout settings
  TIMEOUT: 10000, // 10 seconds
  
  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000 // 1 second
};

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Get full API URL for a specific endpoint
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Get LMS API URL
export const getLmsApiUrl = () => {
  return getApiUrl(API_CONFIG.ENDPOINTS.LMS);
};

// Get Auth API URL
export const getAuthApiUrl = () => {
  return getApiUrl(API_CONFIG.ENDPOINTS.AUTH);
}; 