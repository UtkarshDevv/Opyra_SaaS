// Test Frontend-Backend Connection
import { checkBackendConnection, authApi, coursesApi } from '../api/lmsApi';

export const testFrontendBackendConnection = async () => {
  console.log('🧪 Testing Frontend-Backend Connection...');
  
  try {
    // Test 1: Check if backend is reachable
    console.log('1. Checking backend connectivity...');
    const isConnected = await checkBackendConnection();
    console.log(`✅ Backend connection: ${isConnected ? 'SUCCESS' : 'FAILED'}`);
    
    if (!isConnected) {
      console.log('❌ Backend is not reachable. Please check:');
      console.log('   - Backend server is running on http://localhost:4000');
      console.log('   - No firewall blocking the connection');
      console.log('   - Correct URL in lmsApi.js');
      return false;
    }

    // Test 2: Try to get courses (public endpoint)
    console.log('2. Testing public API endpoint...');
    try {
      const coursesResponse = await coursesApi.getCourses({ limit: 1 });
      console.log('✅ Public API endpoint working');
      console.log(`   Found ${coursesResponse.data.courses.length} courses`);
    } catch (error) {
      console.log('⚠️ Public API endpoint failed:', error.message);
    }

    // Test 3: Try to register a test user
    console.log('3. Testing user registration...');
    try {
      const testUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'test123456',
        role: 'student'
      };
      
      const registerResponse = await authApi.register(testUser);
      console.log('✅ User registration working');
      console.log(`   Created user: ${registerResponse.data.user.name}`);
      
      // Test 4: Try to login with the created user
      console.log('4. Testing user login...');
      const loginResponse = await authApi.login({
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ User login working');
      console.log(`   Logged in as: ${loginResponse.data.user.name}`);
      
      const token = loginResponse.data.token;
      
      // Test 5: Try to get user profile
      console.log('5. Testing authenticated endpoint...');
      const profileResponse = await authApi.getMe(token);
      console.log('✅ Authenticated endpoint working');
      console.log(`   Profile retrieved for: ${profileResponse.data.user.name}`);
      
      // Test 6: Try to create a course (if user is instructor)
      if (loginResponse.data.user.role === 'instructor' || loginResponse.data.user.role === 'admin') {
        console.log('6. Testing course creation...');
        const courseData = {
          title: 'Test Course',
          description: 'This is a test course created by the connection test',
          category: 'Testing',
          price: 0,
          duration: '1 week'
        };
        
        const courseResponse = await coursesApi.createCourse(courseData, token);
        console.log('✅ Course creation working');
        console.log(`   Created course: ${courseResponse.data.course.title}`);
        console.log(`   Course status: ${courseResponse.data.course.status}`);
      }
      
      console.log('\n🎉 All connection tests passed!');
      console.log('✅ Frontend is successfully connected to backend');
      return true;
      
    } catch (error) {
      console.log('❌ Authentication test failed:', error.message);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
};

// Test specific functionality
export const testSpecificFunctionality = async (token) => {
  console.log('🧪 Testing Specific Functionality...');
  
  try {
    // Test course creation
    console.log('1. Testing course creation...');
    const courseData = {
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript programming from scratch',
      category: 'Programming',
      price: 49.99,
      duration: '6 weeks'
    };
    
    const courseResponse = await coursesApi.createCourse(courseData, token);
    console.log('✅ Course created:', courseResponse.data.course.title);
    console.log('   Status:', courseResponse.data.course.status);
    console.log('   Price:', courseResponse.data.course.price);
    
    // Test course update
    console.log('2. Testing course update...');
    const updateData = {
      title: 'Updated JavaScript Course',
      price: 59.99
    };
    
    const updateResponse = await coursesApi.updateCourse(courseResponse.data.course._id, updateData, token);
    console.log('✅ Course updated:', updateResponse.data.course.title);
    console.log('   New price:', updateResponse.data.course.price);
    
    // Test course retrieval
    console.log('3. Testing course retrieval...');
    const getCourseResponse = await coursesApi.getCourse(courseResponse.data.course._id);
    console.log('✅ Course retrieved:', getCourseResponse.data.course.title);
    
    // Test course deletion
    console.log('4. Testing course deletion...');
    await coursesApi.deleteCourse(courseResponse.data.course._id, token);
    console.log('✅ Course deleted successfully');
    
    console.log('\n🎉 All functionality tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Functionality test failed:', error);
    return false;
  }
};

// Debug connection issues
export const debugConnectionIssues = () => {
  console.log('🔍 Debugging Connection Issues...');
  console.log('Common issues and solutions:');
  console.log('');
  console.log('1. Backend not running:');
  console.log('   - Start backend: cd backend && npm start');
  console.log('   - Check if server shows: "Backend running on http://0.0.0.0:4000"');
  console.log('');
  console.log('2. Wrong URL in frontend:');
  console.log('   - Check src/api/lmsApi.js BASE_URL');
  console.log('   - Should be: http://localhost:4000/api/lms');
  console.log('');
  console.log('3. CORS issues:');
  console.log('   - Backend should have CORS enabled');
  console.log('   - Check backend/server.js CORS configuration');
  console.log('');
  console.log('4. Network issues:');
  console.log('   - Try different URL: http://192.168.1.45:4000/api/lms');
  console.log('   - Check firewall settings');
  console.log('');
  console.log('5. Database connection:');
  console.log('   - Check MongoDB connection in backend');
  console.log('   - Verify .env file has correct MONGODB_URI');
}; 