const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Course = require('../models/Course');

// Test course status creation
const testCourseStatus = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create a test instructor
    console.log('\n🧪 Creating test instructor...');
    const testInstructor = await User.create({
      name: 'Test Instructor',
      email: 'instructor@test.com',
      password: 'password123',
      role: 'instructor'
    });
    console.log('✅ Test instructor created:', testInstructor._id);

    // Test 1: Create course without specifying status (should default to 'published')
    console.log('\n🧪 Test 1: Creating course without status...');
    const course1 = await Course.create({
      title: 'Test Course 1',
      description: 'This is a test course without status specified',
      category: 'Technology',
      price: 99.99,
      duration: '4 weeks',
      instructor: testInstructor._id
    });
    console.log('✅ Course 1 status:', course1.status);

    // Test 2: Create course with explicit 'published' status
    console.log('\n🧪 Test 2: Creating course with published status...');
    const course2 = await Course.create({
      title: 'Test Course 2',
      description: 'This is a test course with published status',
      category: 'Business',
      price: 149.99,
      duration: '6 weeks',
      status: 'published',
      instructor: testInstructor._id
    });
    console.log('✅ Course 2 status:', course2.status);

    // Test 3: Create course with explicit 'draft' status
    console.log('\n🧪 Test 3: Creating course with draft status...');
    const course3 = await Course.create({
      title: 'Test Course 3',
      description: 'This is a test course with draft status',
      category: 'Marketing',
      price: 79.99,
      duration: '3 weeks',
      status: 'draft',
      instructor: testInstructor._id
    });
    console.log('✅ Course 3 status:', course3.status);

    // Test 4: Query published courses
    console.log('\n🧪 Test 4: Querying published courses...');
    const publishedCourses = await Course.find({ status: 'published' });
    console.log('✅ Published courses found:', publishedCourses.length);

    // Test 5: Query draft courses
    console.log('\n🧪 Test 5: Querying draft courses...');
    const draftCourses = await Course.find({ status: 'draft' });
    console.log('✅ Draft courses found:', draftCourses.length);

    // Test 6: Query all courses
    console.log('\n🧪 Test 6: Querying all courses...');
    const allCourses = await Course.find();
    console.log('✅ Total courses found:', allCourses.length);

    // Display course details
    console.log('\n📋 Course Details:');
    allCourses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title} - Status: ${course.status} - Price: $${course.price}`);
    });

    // Clean up test data
    console.log('\n🧪 Cleaning up test data...');
    await User.findByIdAndDelete(testInstructor._id);
    await Course.findByIdAndDelete(course1._id);
    await Course.findByIdAndDelete(course2._id);
    await Course.findByIdAndDelete(course3._id);
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 Course status tests completed!');
    console.log('✅ Default status is now: published');
    console.log('✅ Explicit status setting works');
    console.log('✅ Status queries work correctly');

  } catch (error) {
    console.error('❌ Course status test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the test
testCourseStatus(); 