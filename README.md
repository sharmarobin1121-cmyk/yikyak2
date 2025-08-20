# Spark - Anonymous Dating App

A modern, sleek anonymous dating app built with Expo and React Native, featuring Twilio phone authentication.

## Features

- 🔐 **Twilio Phone Authentication** - Secure SMS verification
- 💬 **Anonymous Messaging** - Up to 5 active chats per user
- 📍 **Proximity-Based** - Connect with people within 5 miles
- 🎭 **Privacy-First** - Optional mutual profile reveals
- 📱 **Cross-Platform** - iOS and Android support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Twilio Configuration

1. Create a Twilio account at [twilio.com](https://www.twilio.com)
2. Get your Account SID and Auth Token from the Twilio Console
3. Create a Verify Service in the Twilio Console
4. Get a Twilio phone number

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
TWILIO_SERVICE_SID=your_twilio_verify_service_sid_here
```

### 4. Run the App

```bash
npm run dev
```

## Twilio Setup Guide

### Step 1: Create Twilio Account
1. Go to [twilio.com](https://www.twilio.com) and sign up
2. Verify your email and phone number

### Step 2: Get Credentials
1. Go to the Twilio Console Dashboard
2. Copy your **Account SID** and **Auth Token**

### Step 3: Create Verify Service
1. In the Twilio Console, go to **Verify** > **Services**
2. Click **Create new Service**
3. Give it a name like "Spark App Verification"
4. Copy the **Service SID**

### Step 4: Get Phone Number (Optional)
1. Go to **Phone Numbers** > **Manage** > **Buy a number**
2. Choose a number (only needed for custom SMS sending)

### Step 5: Configure Environment
Add all credentials to your `.env` file as shown above.

## API Endpoints

- `POST /api/send-code` - Send SMS verification code
- `POST /api/verify-code` - Verify SMS code and authenticate user

## Tech Stack

- **Frontend**: React Native with Expo
- **Authentication**: Twilio Verify API
- **Navigation**: Expo Router
- **State Management**: React Context
- **Storage**: AsyncStorage
- **Styling**: React Native StyleSheet with gradients

## Development

The app uses Expo's development build system. Make sure you have the Expo CLI installed:

```bash
npm install -g @expo/cli
```

## Production Deployment

Before deploying to production:

1. Set up proper environment variables
2. Configure Twilio webhook URLs
3. Implement proper error handling
4. Add rate limiting for API endpoints
5. Set up user database integration

## License

MIT License - see LICENSE file for details