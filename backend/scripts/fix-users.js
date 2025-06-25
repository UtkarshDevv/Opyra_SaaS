const mongoose = require('mongoose');
require('dotenv').config();

// Import User model
const User = require('../models/User');

// Fix existing users
const fixUsers = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find users without isActive field
    const usersToFix = await User.find({ isActive: { $exists: false } });
    console.log(`Found ${usersToFix.length} users without isActive field`);

    if (usersToFix.length > 0) {
      // Update all users to have isActive: true
      const result = await User.updateMany(
        { isActive: { $exists: false } },
        { $set: { isActive: true } }
      );
      console.log(`✅ Updated ${result.modifiedCount} users with isActive: true`);
    } else {
      console.log('✅ All users already have isActive field');
    }

    // Show all users
    const allUsers = await User.find({}, 'name email role isActive');
    console.log('\n📋 All Users:');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role} - Active: ${user.isActive}`);
    });

    console.log('\n🎉 User fix completed successfully!');

  } catch (error) {
    console.error('❌ User fix failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the fix
fixUsers(); 