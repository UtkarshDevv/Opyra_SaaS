const mongoose = require('mongoose');
require('dotenv').config();

const testMongoConnection = async () => {
  console.log('🔗 Testing MongoDB Connection...');
  console.log('Environment:', process.env.NODE_ENV || 'development');
  
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error('❌ MONGODB_URI is not defined in .env file');
    return;
  }
  
  // Mask the password for security
  const maskedURI = mongoURI.replace(/:([^@]+)@/, ':****@');
  console.log('Connection string:', maskedURI);
  
  try {
    console.log('Attempting to connect...');
    
    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections found:', collections.length);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.log('\n🔍 Troubleshooting tips:');
      console.log('1. Check if your MongoDB Atlas cluster is running');
      console.log('2. Verify your connection string is correct');
      console.log('3. Check Network Access in MongoDB Atlas');
      console.log('4. Make sure your IP is whitelisted');
      console.log('5. Verify username/password are correct');
    }
    
    if (error.message.includes('ETIMEDOUT')) {
      console.log('\n⏰ Connection timeout - possible issues:');
      console.log('- Network connectivity problems');
      console.log('- Firewall blocking connection');
      console.log('- MongoDB Atlas cluster is down');
      console.log('- Wrong connection string');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n🌐 DNS resolution failed - possible issues:');
      console.log('- Check your internet connection');
      console.log('- Verify the cluster URL is correct');
      console.log('- Try using a different DNS server');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Connection closed');
    }
    process.exit(0);
  }
};

testMongoConnection(); 