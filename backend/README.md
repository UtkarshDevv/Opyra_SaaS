# SaaS Accounting Backend

This is a modular, production-ready Node.js/Express backend for the Accounting feature.

## Setup

```bash
cd backend
npm install
```

## Run

```bash
npm start
```

The server will start on port 4000 by default.

## API Endpoints
- `GET /api/accounting/invoices` - List invoices
- `POST /api/accounting/invoices` - Create invoice
- `GET /api/accounting/reports` - Get financial reports
- `POST /api/accounting/reconciliation` - Bank reconciliation 

## Troubleshooting

### Expo Go and Local Backend

If you're using Expo Go and a local backend, you might encounter network connectivity issues. This is because Expo Go runs on your physical device, and `localhost` or `127.0.0.1` in your code refers to the device itself, not your computer. Your backend is running on your computer, so your device cannot reach `localhost:4000`.

To fix this, follow these steps:

1. **Find your computer's local IP address**
   - On Windows, run in Command Prompt:
     ```
     ipconfig
     ```
     Look for something like `IPv4 Address` (e.g., `192.168.1.5`).

2. **Update the API URL in your frontend**
   - Open `src/screens/Accounting/accountingApi.js`.
   - Change:
     ```js
     const BASE_URL = 'http://localhost:4000/api/accounting';
     ```
     to:
     ```js
     const BASE_URL = 'http://192.168.1.5:4000/api/accounting'; // use your actual IP
     ```

3. **Make sure your phone and computer are on the same WiFi network**
   - Both devices must be on the same local network.

4. **Restart your Expo app**
   - Save your changes.
   - Reload the app in Expo Go.

If you still can't connect, make sure your firewall allows inbound connections to port 4000.

Remember, do not use `localhost` or `127.0.0.1` in your API URLs when testing on a real device. Use your computer's LAN IP address instead.