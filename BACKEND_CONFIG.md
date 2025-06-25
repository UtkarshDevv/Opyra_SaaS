# Backend Configuration Guide

## Backend URI Setup

Your frontend is configured to connect to the backend at: **`http://localhost:4000`**

### Current Configuration

- **Backend URL**: `http://localhost:4000`
- **API Base**: `http://localhost:4000/api`
- **LMS Endpoint**: `http://localhost:4000/api/lms`
- **Auth Endpoint**: `http://localhost:4000/api/auth`

### Configuration Files

1. **`src/constants/config.js`** - Centralized API configuration
2. **`src/api/lmsApi.js`** - LMS API service using the configuration
3. **`src/utils/testBackendConnection.js`** - Backend connection testing utility

### Environment Variables

You can override the backend URL using environment variables:

```bash
# For React Native/Expo
REACT_APP_API_URL=http://your-backend-url:4000

# For development
REACT_APP_API_URL=http://localhost:4000

# For production
REACT_APP_API_URL=https://your-production-backend.com
```

### Testing Backend Connection

The app automatically tests the backend connection on startup. You can also test manually:

```javascript
import { testBackendConnection } from './src/utils/testBackendConnection';

// Test connection
const result = await testBackendConnection();
console.log('Backend status:', result);
```

### Troubleshooting

1. **Backend not running**: Make sure your backend server is running on port 4000
2. **Network issues**: Check if localhost:4000 is accessible from your device/emulator
3. **CORS issues**: Backend is configured to allow requests from localhost:3000
4. **Timeout issues**: API calls have a 10-second timeout with retry logic

### Demo Mode

If the backend is not available, the app automatically switches to demo mode with:
- Admin: `admin@lms.com` / `admin123`
- Instructor: `instructor@lms.com` / `instructor123`
- Student: `student@lms.com` / `student123`

### Backend Status Indicators

- 🟢 **Green**: Backend connected and working
- 🟠 **Orange**: Checking backend connection
- 🔴 **Red**: Backend disconnected (demo mode active)

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Backend health check |
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/lms/courses` | GET | Get all courses |
| `/api/lms/courses` | POST | Create new course |
| `/api/lms/users` | GET | Get all users (admin) |

### Quick Test Commands

```bash
# Test backend health
curl http://localhost:4000/health

# Test API documentation
curl http://localhost:4000/api

# Test course listing
curl http://localhost:4000/api/lms/courses
``` 