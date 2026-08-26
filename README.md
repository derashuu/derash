# ETFC 02 Underground Book — Setup Guide

Two pages:
- `index.html` — the public board (create bets, back a fighter, pay via Telebirr, upload screenshot)
- `admin.html` — passcode-gated corner (approve/reject payments, manage fighters, settle results)

Shared files: `style.css` (all styling) and `config.js` (the only file you edit).

## 1. Create your Firebase project

1. Go to https://console.firebase.google.com and click **Add project**. Name it anything (e.g. `etfc02-book`). You can skip Google Analytics.
2. Once created, click the **`</>`** (web) icon on the project overview page to register a web app. Give it a nickname, skip Firebase Hosting (you're using Vercel).
3. Firebase will show you a `firebaseConfig` object — copy the whole thing.
4. Open `config.js` in this folder and paste your values in, replacing the `PASTE_YOUR_...` placeholders.

## 2. Turn on Firestore (the database)

1. In the left sidebar: **Build → Firestore Database → Create database**.
2. Choose **Start in test mode** (fine for a class assignment — it's open read/write for 30 days).
3. Pick any region close to you and click **Enable**.

## 3. Turn on Storage (for payment screenshots)

1. Left sidebar: **Build → Storage → Get started**.
2. Choose **Start in test mode** again, same region, click **Done**.

> Test mode rules expire after 30 days. If your assignment is due before then you don't need to touch anything else. If you want it to keep working longer, go to the Rules tab in Firestore and Storage and extend the `request.time <` date, or ask me and I'll write proper rules for you.

## 4. Set your admin passcode + Telebirr details

Still in `config.js`:
```js
const ADMIN_PASSCODE = "etfc02admin";   // change this to your own
const TELEBIRR_NUMBER = "09XXXXXXXX";   // your real Telebirr number
const TELEBIRR_NAME = "Your Name Here";
```

## 5. Push to GitHub

```bash
cd etfc-betting
git init
git add .
git commit -m "ETFC 02 betting board"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 6. Deploy on Vercel

1. Go to https://vercel.com, sign in with GitHub.
2. **Add New → Project**, pick your repo.
3. It's a static site (no framework, no build command) — Vercel will auto-detect this. Just click **Deploy**.
4. You'll get a live URL like `etfc02-book.vercel.app`. The public board is at `/`, admin is at `/admin.html`.

## How it works

- **Posting a bet**: tap the `+` button on the board → pick/enter a fighter, name, stake, optional trash talk → posts instantly to everyone viewing the site (Firestore real-time updates).
- **Backing a fighter**: tap "Bet Against Him" on any open bout → shown your Telebirr number → enter name, amount, upload a screenshot of the payment → goes into the bet as `pending`.
- **Admin review**: on `/admin.html`, enter the passcode → see every bet and every backer's screenshot → Approve or Reject each one.
- **Settling a bout**: on the admin page, use the "Settle" dropdown on any bout to record the winner (or reopen it).

## If you want to extend it later

- Add odds/payout math
- Require the creator's own bet to also go through a payment step
- Add push/email notification to admin when a new screenshot comes in
- Swap the hardcoded passcode for real Firebase Auth

Ask me anytime — the code is plain HTML/CSS/JS so it's easy to keep building on.
