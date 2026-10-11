# MedNear 💊 — Medicine availability finder

A mobile-friendly web app (installable PWA, 8 Indian languages) to find which nearby pharmacies have a medicine in stock.
Two logins: **Consumer** (search, map links, reserve) and **Shop owner** (update stock, see incoming reservations, insights).
Demo shop owner login: `owner` / `1234`.

## Files
| File | Purpose |
|---|---|
| `index.html` | App page |
| `style.css` | Styles (light/dark, mobile-first) |
| `i18n.js` | Translations (add a language = add one block) |
| `app.js` | App logic |
| `manifest.webmanifest`, `icon*.png/svg`, `sw.js` | Install-to-home-screen + offline support |
| `vercel.json` | Vercel settings |

## Suggested demo flow
1. **Real-time sync:** open the app in **two browser tabs**. Tab 1: *Shop owner* (⚡ demo button) → change a stock number. Tab 2: *Consumer* (⚡ demo button) with the same medicine searched → it updates instantly with a "🔄 Live update" message.
2. **Reserve** a medicine as a consumer → animated ✓ with a **QR pickup code**. As the shop owner, type the code in **Verify pickup code** to complete the order.
3. Switch **language**, **high contrast** and **dark mode** to show accessibility.
4. Add a **⏰ medicine reminder** with days and times, and tap **🔔 Test alarm**.

## Animations & extras
- Page-load rise-in of result cards (staggered), animated stock bars, pop-in badges, smooth tab and language fades, tap ripple on buttons, hover lift on cards, animated gradient header and floating 💊, pulsing 112 emergency button, animated ✓ success screen when you reserve, count-up numbers in the owner Insights.
- **⏰ Medicine reminders** (consumer): choose the medicine, the **days of the week** and **one or more times**. At the time an **alarm rings** (loud beeps + vibration + spoken reminder + notification) with ✓ Taken / ⏰ Snooze 5 min / ✕ Skip. Use **🔔 Test alarm** to check your sound. Tap anywhere on the page once after opening the app so the browser allows sound.
  - **Limit:** a website can only ring while MedNear is open (tab or installed app, screen on). The app keeps the screen awake while reminders exist. Ringing when the app is fully closed needs a native app or a server sending push notifications.
- All motion is switched off automatically for people who enable "Reduce motion" on their phone.

## Easy to read for everyone
- **High contrast** mode and **Dark mode** — at the top of every screen, remembered on the device.
- Larger base font, higher text contrast, 44px tap targets, visible keyboard focus, screen-reader labels, reduced-motion support.
- Fonts fall back to Noto / Nirmala for Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati and Kannada.
- Long help paragraphs (e.g. the how-to steps) are English-only for now; all buttons, labels and headings are translated.

## Deploy on Vercel (no build step)
**Option A – Drag & drop / CLI**
```bash
npm i -g vercel
cd mednear
vercel --prod
```
**Option B – GitHub**
1. Push this folder to a GitHub repo.
2. On vercel.com → *Add New → Project* → import the repo.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Deploy.

## Use on mobile
- Open your Vercel link on the phone.
- Android (Chrome): menu ⋮ → **Install app / Add to Home screen**.
- iPhone (Safari): Share → **Add to Home Screen**.
- "Use my location" needs HTTPS, which Vercel provides.

## Important notes
- All data (stock, accounts, reservations) is **sample data stored in the browser** (`localStorage`). Passwords are not secure. Nothing is shared between devices.
- For a real launch, replace storage with a backend such as **Firebase** or **Supabase** (auth + realtime database), so shop owners' stock updates reach every patient instantly.
- The map section opens **Google Maps** in a new tab (real stores, hours, reviews). It does not need an API key.
- Always confirm stock with the pharmacy; this app is not medical advice.
