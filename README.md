# ⚡ STRIKE Homepage — Thunder Hackathon 6.0 Submission

> **"An accurate STRIKE recreation enhanced with a helpful learning-guide experience that turns genuine learner questions into a natural, interactive discovery path toward a limited-time offer."**

---

## 🚀 Live Demo

> Run locally — see setup instructions below.

---

## 💡 Project Idea

This project recreates the **STRIKE** homepage ([strikes.in](https://strikes.in)) with creative enhancements as part of **Thunder Hackathon 6.0** by Coder Army × STRIKE.

The core idea: don't just show the sale. **Make the user discover it.**

The experience takes users on a journey:

```
Land on STRIKE → Browse normally → Chat with Rohit Negi AI guide →
Learn about hackathons → Notice the 🪔 Diwali lamp → Tap it →
Animated reveal → Discover the limited-time offer → Copy coupon → Claim
```

---

## ✨ Features

### 🏠 Homepage Recreation
- Accurate recreation of the STRIKE homepage visual identity
- Navbar with scroll-to-section navigation
- Hero section with two-column layout + autoplay video (mute/unmute/pause controls)
- **Learn → Build → Compete** journey flow
- Membership Plans (Strike Plus & Ultra) with duration tabs + silver/gold themes
- Course cards with 3D flip animation on hover (front: thumbnail, back: highlights)
- Why Us section with image cards + FAANG logos
- Hackathon proof section (Thunder Hackathons 1–6 with real verified winners)
- Mentor cards (Rohit Negi & Aditya Tandon) with 3D flip animation
- Scrolling reviews marquee
- FAQ accordion
- Footer

### 🤖 AI Chatbot (Rohit Negi Guide)
- Floating chatbot with Rohit Negi's photo and "Online" status
- 4 fixed quick-prompts with instant rule-based responses
- Free-text queries answered by **Gemini AI** with full system prompt
- Rohit Negi's teaching style: Hinglish, first-principles, sarcastic redirects for coding questions
- Chatbot subtly hints at the Diwali sale and triggers the reveal
- Coding question redirect — refuses to give code, redirects to STRIKE courses with humor

### 🪔 Diwali Sale Discovery (Main Judged Feature)
The sale is designed as a **discovery experience**, not a banner:

1. Page loads → 2s delay → existing 🪔 diya **grows large**, wobbles, shrinks back to corner
2. User notices glowing lamp in bottom-right → **"tap me"** hint
3. Tap → full-screen dramatic reveal animation → offer modal
4. Offer card shows: **25% OFF**, discounted price, countdown timer, coupon code
5. **Course switcher** (‹ › arrows + dot indicators) to browse Ultra/Plus offers
6. Copy coupon → Claim offer
7. **Countdown persists after refresh** (localStorage)
8. **Expired state** — coupon disabled, offer locked

### ⚡ Hackathons Page (`/hackathons`)
- Dedicated route with confetti burst animation on arrival
- Category tabs: Thunder Series / DSA Competitions / GenAI Hackathons / Web/UI Competitions
- Full hackathon records with real verified winners (CSS/HTML/Thunder 1–6)
- Upcoming hackathons with "LIVE NOW" badge
- **Learn → Build → Compete** pathway
- **STRIKE vs Typical Course** comparison table with hover animations
- Typewriter CTA — "Be a part of our Thunder Hackathon 6 / DSA Championship / Agentic AI Hackathon"

---

## 🛠️ Tech Stack

| Area | Technology |
|------|-----------|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Routing | React Router DOM |
| AI Chatbot | Google Gemini API (gemini-1.5-flash) |
| Timer | localStorage (persistent countdown) |

---

## 📁 Project Structure

```
strike-homepage/
├── public/
│   ├── rohit.PNG          # Rohit Negi photo (chatbot)
│   ├── thunder.png        # Thunder course thumbnail
│   └── video.mp4          # Hero section autoplay video
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Fixed navbar with scroll navigation
│   │   ├── Hero.jsx           # Two-column hero + video + Learn→Build→Compete
│   │   ├── Membership.jsx     # Strike Plus/Ultra plans with duration tabs
│   │   ├── Courses.jsx        # Course cards with 3D flip
│   │   ├── WhyUs.jsx          # Feature cards + FAANG logos
│   │   ├── HackathonProof.jsx # Thunder hackathon grid (homepage)
│   │   ├── Mentors.jsx        # Mentor cards with 3D flip
│   │   ├── Reviews.jsx        # Auto-scrolling reviews marquee
│   │   ├── FAQ.jsx            # Accordion FAQ
│   │   ├── Footer.jsx         # Footer
│   │   ├── Chatbot.jsx        # Rohit Negi AI chatbot (Gemini)
│   │   ├── DiwaliSale.jsx     # Diwali drop animation + offer modal
│   │   ├── ConfettiBurst.jsx  # Confetti animation for hackathons page
│   │   └── ScrollToTop.jsx    # Scroll to top on route change
│   ├── pages/
│   │   └── HackathonsPage.jsx # Full hackathons dedicated page
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example           # Environment variable reference
├── .gitignore
├── package.json
└── vite.config.js
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/pandeydarshit96-debug/strike-homepage.git
cd strike-homepage
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
> Get your free API key at [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

---

## 🧪 Feature Checklist

- [x] Working website
- [x] STRIKE homepage recreation (navigation, hero, courses, membership, mentors, reviews, FAQ, footer)
- [x] AI chatbot with Rohit Negi persona (Gemini API + rule-based fallback)
- [x] Hackathon proof section with verified real winner data
- [x] Creative Diwali sale discovery experience (diya animation → reveal → offer)
- [x] Multi-course offer switcher (Ultra / Plus)
- [x] Persistent countdown timer (survives refresh via localStorage)
- [x] Coupon copy functionality
- [x] Expired state (coupon disabled after countdown)
- [x] Close/dismiss offer
- [x] Dedicated `/hackathons` page with confetti burst
- [x] Desktop + mobile responsive
- [x] Performance optimization (isolated Countdown component, memoized Sparks, useCallback)
- [x] Video autoplay with mute/unmute/pause controls
- [x] 3D flip animations on course and mentor cards
- [x] Hover animations with category-matched glow colors

---

## 🎯 User Journey

```
1. User lands on STRIKE homepage
2. Browses hero — sees Learn → Build → Compete flow
3. Notices Rohit Negi chatbot in bottom-right
4. Opens chatbot → asks questions about courses/fee recovery
5. Bot explains hackathon ecosystem, links to proof section
6. User sees hackathon results — real verified winners
7. 🪔 Diwali diya grows large, wobbles, settles back
8. User taps the glowing lamp
9. Dramatic reveal animation → Diwali Drop offer card
10. Sees 25% OFF, countdown, coupon STRIKE-DIWALI25
11. Switches between Ultra/Plus with ← → arrows
12. Copies coupon → clicks Claim
13. Visits /hackathons page — confetti celebration
14. Sees full hackathon record across Thunder/DSA/GenAI/Web tracks
```

---

## 🏗️ Technical Approach

### Sale Discovery
The offer is not shown as a banner. It is discovered through the diya animation — a native STRIKE element that grows, shakes, and returns to its corner. Users discover it naturally.

### Chatbot Architecture
- **Fixed quick-prompts** → instant rule-based responses (no API call needed)
- **Free-text** → Gemini API with a detailed system prompt defining Rohit Negi's teaching style
- Auto-fallback from `gemini-3-flash-preview` → `gemini-1.5-flash`
- Chatbot subtly hints at the Diwali sale without shouting about it

### Timer Persistence
```js
// End timestamp stored in localStorage
const end = Date.now() + 5 * 24 * 60 * 60 * 1000
localStorage.setItem('strike_diwali_end', String(end))
// On reload: derive remaining time from stored timestamp
```

### Performance
- `Sparks` particle data computed once at module level (not on every render)
- `Countdown` isolated as `React.memo` — only it re-renders every second
- `useCallback` for all stable handler references in App.jsx
- `IntersectionObserver` to pause video when hero is out of view

---

## ⚠️ Known Limitations

- Voice interaction not implemented (per MVP spec)
- Multilingual support not implemented (per MVP spec)
- Payment processing not implemented
- Hackathon 6 winners not yet announced (live competition)
- Gemini API has rate limits on the free tier — chatbot may show "API limit hit" occasionally

---

## 🙏 Credits

- **STRIKE / Coder Army** — original brand, course content, mentor data
- **Rohit Negi & Aditya Tandon** — mentors (Coder Army / STRIKE founders)
- Hackathon winner data verified from official Thunder Hackathon result announcements
- Built for Thunder Hackathon 6.0 — September 2026
