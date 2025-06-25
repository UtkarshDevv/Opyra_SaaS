import { API_CONFIG } from '../constants/config';

// Test backend connection
export const testBackendConnection = async () => {
  const testUrl = `${API_CONFIG.BASE_URL}/health`;
  
  try {
    console.log('🔍 Testing backend connection...');
    console.log(`📍 Backend URL: ${API_CONFIG.BASE_URL}`);
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 5000);
    });
    
    // Create the fetch promise
    const fetchPromise = fetch(testUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connection successful!');
      console.log('📊 Backend status:', data);
      return { success: true, data };
    } else {
      console.error('❌ Backend responded with error:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    
    if (error.message.includes('timeout')) {
      console.error('⏰ Connection timeout - backend might be slow or unreachable');
    } else if (error.message.includes('fetch')) {
      console.error('🌐 Network error - check if backend is running on port 4000');
    }
    
    return { success: false, error: error.message };
  }
};

// Get backend status for display
export const getBackendStatus = async () => {
  const result = await testBackendConnection();
  
  if (result.success) {
    return {
      status: 'connected',
      message: 'Backend is running and accessible',
      url: API_CONFIG.BASE_URL
    };
  } else {
    return {
      status: 'disconnected',
      message: `Backend connection failed: ${result.error}`,
      url: API_CONFIG.BASE_URL
    };
  }
};

// Check if backend is available for API calls
export const isBackendAvailable = async () => {
  const result = await testBackendConnection();
  return result.success;
}; 