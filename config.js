/* =========================================================
   ETFC 02 — CONFIG
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

// ImgBB API key — used to host payment screenshots (free, no billing account
// needed, unlike Firebase Storage which now requires the paid Blaze plan).
// Get yours free at https://api.imgbb.com/ (sign up, "Add API key").
const IMGBB_API_KEY = "b0c945dc58891773df56977dd9bf8d35";

// Real ETFC 002 bout pairings — who actually fights who. This is what lets
// the app say "ጆኒ ያሸንፋል" (Jhonny wins) instead of a generic "oppose" button.
// CONFIRMED from you: Sedo vs Jhonny. Everything else below is a GUESS
// (paired in roster order) — fix any wrong pairs here, both directions.
const FIGHTER_OPPONENTS = {
  Sedo: "Jhonny",
  Jhonny: "Sedo",
  Elezar: "Kaleab",
  Kaleab: "Elezar",
  Edris: "Boika",
  Boika: "Edris",
  Robel: "Nikatehilina",
  Nikatehilina: "Robel",
  Biniam: "Esubalew",
  Esubalew: "Biniam",
  Haymanot: "Abreham",
  Abreham: "Haymanot",
  Desalegn: "Surafel",
  Surafel: "Desalegn",
  Rebik: "Stephen",
  Stephen: "Rebik",
  Habtamu: "Frezer",
  Frezer: "Habtamu",
  Zahara: "Yabsira",
  Yabsira: "Zahara",
  Yeamlaksira: "Mesfin",
  Mesfin: "Yeamlaksira",
  // "Abenezer" has no confirmed opponent yet — leave unpaired until you know.
};

// ---- init (shared by index.html and admin.html) ----
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
