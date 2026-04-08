# Safedle - Higher or Lower Game
## Vercel pe Deploy karne ka Tarika

---

## Project Structure

```
project/
├── api/
│   └── characters.js      ← Backend (Safebooru se data fetch karta hai)
├── public/
│   └── game/
│       ├── index.html     ← Main game page
│       ├── daily.html     ← Daily challenge
│       ├── script.js      ← Game logic
│       ├── cache.js       ← Cache manager (FIXED)
│       ├── style.css      ← Game styles
│       ├── daily.js       ← Daily challenge logic
│       └── logo.png       ← Logo
└── vercel.json            ← Vercel config
```

---

## Step 1 — GitHub Account banana

1. https://github.com pe jao
2. "Sign Up" karo (free)
3. New repository banao — naam dena: `safedle`
4. Public rakho

---

## Step 2 — Files Upload karna

GitHub repository mein "Add file" → "Upload files" click karo
Ye folder structure exactly upload karo:
- `api/characters.js`
- `public/game/` folder saare files ke saath
- `vercel.json`

---

## Step 3 — Vercel pe Deploy karna

1. https://vercel.com pe jao
2. "Sign Up with GitHub" karo (free)
3. "New Project" click karo
4. Apna `safedle` GitHub repo select karo
5. "Deploy" dabao — bas!

Vercel automatically detect karega:
- `api/` folder → Serverless Functions banega
- `public/` folder → Static files serve karega
- `vercel.json` → Routing config

---

## Kaise kaam karta hai

```
Browser
  ↓ page load karo
index.html load hota hai
  ↓ game shuru hota hai
cache.js → /api/characters call karta hai
  ↓
api/characters.js (Vercel Function)
  ↓ Safebooru API call karta hai
safebooru.org/index.php?page=dapi...
  ↓ character data + images wapis aate hain
  ↓
Game mein characters dikhte hain images ke saath ✅
```

---

## API kya hai?

**Safebooru Public API** — bilkul free, no key needed:
- `https://safebooru.org/index.php?page=dapi&s=tag&q=index&json=1&name=pikachu`
- SFW anime/game character images deta hai
- Post counts real-time hain

---

## Troubleshooting

**Images nahi aa rahe?**
→ Safebooru rate limiting ho sakta hai, thodi der baad try karo

**API error aa raha hai?**
→ Vercel dashboard mein "Functions" tab mein logs dekho

**Characters load nahi ho rahe?**
→ Browser console (F12) mein error dekho
