# 🚀 Intouch Marketing Solutions

A complete, production-ready **React + Vite** website for a digital marketing agency.

---

## ✅ Tech Stack

- **React 18** + **Vite 5**
- **React Router DOM v6** (multi-page SPA routing)
- **CSS Modules** (scoped, per-component styles)
- **React Icons** (no extra icon font needed)
- Fully **responsive** — mobile-first
- **Vercel-ready** (`vercel.json` included)

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar/         ← Fixed nav with hamburger menu
│   ├── Footer/         ← 4-column footer + Google Map
│   └── ChatBot/        ← Floating AI chatbot widget
├── pages/
│   ├── Home/           ← Video hero, stats, service preview
│   ├── About/          ← Company intro, animated socials, why-us
│   ├── Services/       ← 8-service card grid
│   ├── Reviews/        ← Infinite auto-scroll slider
│   ├── Clients/        ← Logo marquee slider
│   ├── Career/         ← Job listings + apply form
│   └── Contact/        ← WhatsApp form + Google Map
├── data/
│   ├── services.js
│   ├── reviews.js
│   └── jobs.js
├── hooks/
│   └── useFadeUp.js    ← Intersection Observer scroll animations
└── styles/
    └── global.css      ← CSS variables, resets, shared utilities
```

---

## 🖥️ Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI (recommended)
```bash
npm install -g vercel
vercel
```

### Option B — Vercel Dashboard (drag & drop)
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import from GitHub **OR** drag the project folder
3. Set:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy** ✅

> The included `vercel.json` handles SPA routing automatically — no extra config needed.

---

## 🎨 Customisation

| Item | Location |
|------|----------|
| Brand colour (`#ff6600`) | `src/styles/global.css` → `--orange` |
| Company phone / email | `src/components/Footer/Footer.jsx` + `src/pages/Contact/Contact.jsx` |
| WhatsApp number | `src/pages/Contact/Contact.jsx` → `WA_NUMBER` |
| Services list | `src/data/services.js` |
| Reviews | `src/data/reviews.js` |
| Job listings | `src/data/jobs.js` |
| Hero video | `src/pages/Home/Home.jsx` → `<source src="...">` |
| Google Maps embed | Footer + Contact page `iframe src` |
| Chatbot responses | `src/components/ChatBot/ChatBot.jsx` → `BOT` object |

---

## 📄 Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/reviews` | Reviews |
| `/clients` | Clients |
| `/career` | Career |
| `/contact` | Contact |

---

## 🤖 AI Chatbot

The chatbot uses **keyword matching** by default. To connect a real AI (OpenAI, etc.):

1. Open `src/components/ChatBot/ChatBot.jsx`
2. Replace the `reply()` function with an API call to your backend or OpenAI endpoint
3. The message state structure is already ready — just swap the logic

---

Made with ♥ in Udupi, India
