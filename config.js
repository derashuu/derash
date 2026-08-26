/* =========================================================
   ETFC 02 — FIREBASE CONFIG
   This is the ONLY file you need to edit with your own values.
   See README.md for exactly where to get each one.
   ========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyCALqM5qt74ujglN-K7gUM1BVG0MP7iYxc",
  authDomain: "derash-32e9e.firebaseapp.com",
  projectId: "derash-32e9e",
  storageBucket: "derash-32e9e.firebasestorage.app",
  messagingSenderId: "457835341333",
  appId: "1:457835341333:web:523d71145cec705153501c",
};

// Passcode to view the admin page. Change this to whatever you want.
const ADMIN_PASSCODE = "abcde12345";

// Telebirr number shown to users when they need to pay to back a fighter.
const TELEBIRR_NUMBER = "09XXXXXXXX";
const TELEBIRR_NAME = "Your Name Here";

// ---- init (shared by index.html and admin.html) ----
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
