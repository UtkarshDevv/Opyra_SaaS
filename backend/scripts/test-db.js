const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Test database operations
const testDatabase = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Create a test user
    console.log('\n🧪 Test 1: Creating test user...');
    const testUser = await User.create({
      name: 'Test Instructor',
      email: 'test@example.com',
      password: 'password123',
      role: 'instructor'
    });
    console.log('✅ Test user created:', testUser._id);

    // Test 2: Create a test course
    console.log('\n🧪 Test 2: Creating test course...');
    const testCourse = await Course.create({
      title: 'Test Course',
      description: 'This is a test course for database operations',
      category: 'Technology',
      price: 99.99,
      duration: '4 weeks',
      instructor: testUser._id,
      status: 'published'
    });
    console.log('✅ Test course created:', testCourse._id);

    // Test 3: Update the course
    console.log('\n🧪 Test 3: Updating test course...');
    const updatedCourse = await Course.findByIdAndUpdate(
      testCourse._id,
      { 
        title: 'Updated Test Course',
        price: 149.99,
        description: 'This course has been updated successfully'
      },
      { new: true, runValidators: true }
    );
    console.log('✅ Course updated:', updatedCourse.title);

    // Test 4: Create another user and enroll them
    console.log('\n🧪 Test 4: Creating student and enrolling...');
    const testStudent = await User.create({
      name: 'Test Student',
      email: 'student@example.com',
      password: 'password123',
      role: 'student'
    });

    const enrollment = await Enrollment.create({
      user: testStudent._id,
      course: testCourse._id,
      enrolledAt: new Date(),
      status: 'active'
    });
    console.log('✅ Student enrolled:', enrollment._id);

    // Test 5: Update enrollment progress
    console.log('\n🧪 Test 5: Updating enrollment progress...');
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollment._id,
      {
        progress: 25,
        completedLessons: [1, 2, 3],
        lastAccessed: new Date()
      },
      { new: true }
    );
    console.log('✅ Enrollment progress updated:', updatedEnrollment.progress + '%');

    // Test 6: Query operations
    console.log('\n🧪 Test 6: Testing queries...');
    
    const allCourses = await Course.find({ status: 'published' }).populate('instructor', 'name');
    console.log('✅ Published courses found:', allCourses.length);

    const userEnrollments = await Enrollment.find({ user: testStudent._id })
      .populate('course', 'title price');
    console.log('✅ User enrollments found:', userEnrollments.length);

    const instructorCourses = await Course.find({ instructor: testUser._id });
    console.log('✅ Instructor courses found:', instructorCourses.length);

    // Test 7: Clean up test data
    console.log('\n🧪 Test 7: Cleaning up test data...');
    await User.findByIdAndDelete(testUser._id);
    await User.findByIdAndDelete(testStudent._id);
    await Course.findByIdAndDelete(testCourse._id);
    await Enrollment.findByIdAndDelete(enrollment._id);
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All database tests passed successfully!');
    console.log('✅ Create operations: Working');
    console.log('✅ Read operations: Working');
    console.log('✅ Update operations: Working');
    console.log('✅ Delete operations: Working');
    console.log('✅ Relationship queries: Working');

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the test
testDatabase(); 