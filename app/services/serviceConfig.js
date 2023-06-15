import Constants from "expo-constants";

const { manifest } = Constants;


const prodConfig = {
  // apiKey           : "YOUR_API_KEY",
  // authDomain       : "your-app.firebaseapp.com",
  databaseURL: "https://justmove-380822.rj.r.appspot.com"
  // projectId        : "your-app",
  // storageBucket    : "your-app.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const devConfig = {
  // apiKey           : "YOUR_API_KEY",
  // authDomain       : "your-app.firebaseapp.com",
  databaseURL: `http://${manifest.debuggerHost.split(':').shift()}:21138`
  // projectId        : "your-app",
  // storageBucket    : "your-app.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const config =
  process.env.NODE_ENV === "production"
    ? prodConfig
    : devConfig;


export default config;
