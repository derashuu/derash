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

// Minimum stake allowed anywhere on the board (creating a bet, backing one).
const MIN_BET = 10000;

// ---- starter/demo bets ----
// Builds the same array of example bets used both to seed an empty board
// (index.html, first load) and to reset the board back to a clean demo
// state from the admin page's "Reset Demo Data" button. No bet in here
// ever has a declared winner — the fight hasn't happened yet.
function buildSeedBets() {
  const placeholderShot =
    "https://placehold.co/500x350?text=Payment+Screenshot";

  const NAMES = [
    "Abel",
    "Mekdes",
    "Tomas",
    "Biruk",
    "Hana",
    "Kalkidan",
    "Yonas",
    "Meron",
    "Selam",
    "Dawit",
    "Ruth",
    "Nardos",
    "Bethel",
    "Kalab",
    "Naomi",
    "Samuel",
    "Sara",
    "Daniel",
    "Rahel",
    "Yosef",
    "Tigist",
    "Mikael",
    "Helen",
    "Bereket",
    "Eyerusalem",
    "Nathnael",
    "Betelhem",
    "Amanuel",
    "Selamawit",
    "Fikru",
    "Marta",
    "Solomon",
    "Hiwot",
    "Girma",
    "Aster",
    "Tesfaye",
    "Meskerem",
    "Wondwosen",
    "Zeritu",
    "Alemayehu",
  ];
  let nameIdx = 0;
  function nextName() {
    return NAMES[nameIdx++ % NAMES.length];
  }
  function fakePhone(seed) {
    return "09" + String(10000000 + ((seed * 137) % 90000000)).padStart(8, "0");
  }

  const OTHER_PAIRS = [
    ["Elezar", "Kaleab"],
    ["Edris", "Boika"],
    ["Robel", "Nikatehilina"],
    ["Biniam", "Esubalew"],
    ["Haymanot", "Abreham"],
    ["Desalegn", "Surafel"],
    ["Rebik", "Stephen"],
    ["Habtamu", "Frezer"],
    ["Zahara", "Yabsira"],
    ["Yeamlaksira", "Mesfin"],
  ];

  const examples = [];
  let seed = 0;

  // ---- 15 open bets: creator roots for Sedo (no backer yet) ----
  const sedoAmounts = [
    10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 75000, 90000,
    110000, 130000, 160000, 200000, 250000,
  ];
  sedoAmounts.forEach((amount) => {
    examples.push({
      creatorName: nextName(),
      creatorPhone: fakePhone(seed++),
      fighterName: "Sedo",
      amount,
      note: "",
      status: "open",
      result: null,
      challengers: [],
    });
  });

  // ---- 3 open bets: creator roots for Jhonny (no backer yet), low stake ----
  const jhonnyAmounts = [10000, 12000, 15000];
  jhonnyAmounts.forEach((amount) => {
    examples.push({
      creatorName: nextName(),
      creatorPhone: fakePhone(seed++),
      fighterName: "Jhonny",
      amount,
      note: "",
      status: "open",
      result: null,
      challengers: [],
    });
  });

  // ---- 10 open bets: one per remaining fight-card pairing ----
  const otherAmounts = [
    10000, 15000, 20000, 12000, 30000, 10000, 18000, 22000, 10000, 40000,
  ];
  OTHER_PAIRS.forEach(([a, b], idx) => {
    examples.push({
      creatorName: nextName(),
      creatorPhone: fakePhone(seed++),
      fighterName: idx % 2 === 0 ? a : b,
      amount: otherAmounts[idx],
      note: "",
      status: "open",
      result: null,
      challengers: [],
    });
  });

  // ---- 27 already-matched bets: a backer has stepped up and paid, but
  // NO winner recorded — the fight hasn't happened yet. ----
  const closedAmounts = [
    10000, 12000, 15000, 18000, 20000, 25000, 10000, 30000, 15000, 40000, 10000,
    50000, 12000, 10000, 60000, 15000, 10000, 75000, 20000, 10000, 30000, 10000,
    15000, 100000, 10000, 20000, 10000,
  ];
  for (let i = 0; i < 27; i++) {
    const pair =
      i % 2 === 0 ? ["Sedo", "Jhonny"] : OTHER_PAIRS[i % OTHER_PAIRS.length];
    const creatorFighter = pair[0];
    examples.push({
      creatorName: nextName(),
      creatorPhone: fakePhone(seed++),
      fighterName: creatorFighter,
      amount: closedAmounts[i],
      note: "",
      status: "open",
      result: null,
      challengers: [
        {
          id: `seedc${i}`,
          name: nextName(),
          phone: fakePhone(seed++),
          amount: closedAmounts[i],
          screenshotUrl: placeholderShot,
          status: "approved",
        },
      ],
    });
  }

  // ---- 1 featured matched bet pinned to the top: 2,000,000 birr,
  // Janni Gebru vs Jhossy. No result — fight hasn't happened yet. ----
  examples.push({
    creatorName: "ጃኒ ገብሩ",
    creatorPhone: fakePhone(seed++),
    fighterName: "Sedo",
    amount: 2000000,
    note: "የተለመዱ ተወራራጆች — ትልቅ ገንዘብ።",
    status: "open",
    result: null,
    challengers: [
      {
        id: "seedtop_jhossy",
        name: "ጆሲ",
        phone: fakePhone(seed++),
        amount: 2000000,
        screenshotUrl: placeholderShot,
        status: "approved",
      },
    ],
  });

  return examples;
}

// Writes buildSeedBets() into the "bets" collection with staggered
// timestamps (newest = the featured bet, so it lands at the top).
async function writeSeedBets() {
  const examples = buildSeedBets();
  const baseTime = Date.now() - examples.length * 60000;
  const batch = db.batch();
  examples.forEach((ex, idx) => {
    const ref = db.collection("bets").doc();
    batch.set(ref, {
      ...ex,
      createdAt: firebase.firestore.Timestamp.fromMillis(
        baseTime + idx * 60000
      ),
    });
  });
  await batch.commit();
}

// Deletes every doc in "bets" (chunked, Firestore batches cap at 500) then
// re-seeds. Used by the admin page's "Reset Demo Data" button.
async function resetBetsToSeed() {
  const snap = await db.collection("bets").get();
  const docs = snap.docs;
  for (let i = 0; i < docs.length; i += 400) {
    const chunk = docs.slice(i, i + 400);
    const delBatch = db.batch();
    chunk.forEach((d) => delBatch.delete(d.ref));
    await delBatch.commit();
  }
  await writeSeedBets();
}

// ---- init (shared by index.html and admin.html) ----
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
