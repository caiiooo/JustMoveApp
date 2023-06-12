const prodConfig = {
    // apiKey           : "YOUR_API_KEY",
    // authDomain       : "your-app.firebaseapp.com",
    databaseURL: "https://company-service-dot-tecnova-backend-homo.appspot.com"
    // projectId        : "your-app",
    // storageBucket    : "your-app.appspot.com",
    // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  };
  
  
  const devConfig = {
    // apiKey           : "YOUR_API_KEY",
    // authDomain       : "your-app.firebaseapp.com",
    databaseURL: "http://localhost:8001"
    // projectId        : "your-app",
    // storageBucket    : "your-app.appspot.com",
    // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  };
  
  const config =
    process.env.NODE_ENV === "production"
      ? prodConfig
      : devConfig;
  
  export default config;
  