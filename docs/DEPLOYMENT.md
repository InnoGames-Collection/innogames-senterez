# Senterez Deployment Guide

Senterez is a **split-stack** application:

| Layer | Host | Why |
|-------|------|-----|
| **Frontend** (Vue.js static files) | **Vercel** | Fast CDN, custom domain, GitHub deploy |
| **Backend** (Express + Socket.IO) | **Render** (free tier) | Persistent WebSocket connections |
| **Database** | **MongoDB Atlas** (free tier) | Managed MongoDB |

**Vercel alone cannot run the full game.** Multiplayer chess requires a always-on
Node.js server for Socket.IO and MongoDB for data storage.

---

## Architecture

```
senterez.yourdomain.com          →  Vercel (frontend)
api.senterez.yourdomain.com      →  Render (backend + Socket.IO)
MongoDB Atlas cluster            →  database
```

---

## Step 1 — MongoDB Atlas (free)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a **free M0 cluster**
3. Database Access → create user with password
4. Network Access → allow `0.0.0.0/0` (or Render IP ranges)
5. Connect → copy connection string:

```
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/senterez
```

---

## Step 2 — Backend on Render (free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New → Blueprint**
3. Connect the GitHub repo — Render reads `render.yaml`
4. Set environment variables:

| Variable | Example |
|----------|---------|
| `MONGO_URL` | `mongodb+srv://...` |
| `ALLOWED_ORIGINS` | `https://senterez.yourdomain.com` |
| `JWT_SECRET` | (auto-generated or your own 64+ char secret) |
| `ADMIN_PASSWORD` | strong password for first admin |
| `SEED_INITIAL_ADMIN` | `true` (first deploy only) |

5. Deploy — note your Render URL, e.g. `https://senterez-api.onrender.com`
6. After admin is created, set `SEED_INITIAL_ADMIN=false`

**Custom domain for API:**

Render dashboard → senterez-api → Settings → Custom Domain →
`api.senterez.yourdomain.com` → add CNAME record at your DNS provider.

---

## Step 3 — Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the GitHub repo
3. Configure:

| Setting | Value |
|---------|-------|
| Framework Preset | Other |
| Root Directory | `.` (project root) |
| Build Command | `npm install && npm run build` |
| Output Directory | `dist` |
| Node.js Version | 18.x |

4. **Environment variable** (required):

| Name | Value |
|------|-------|
| `API_URL` | `https://api.senterez.yourdomain.com` (or Render URL) |

5. Deploy

**Custom domain:**

Vercel dashboard → Project → Settings → Domains →
add `senterez.yourdomain.com` → follow DNS instructions (A/CNAME records).

---

## Step 4 — DNS summary

At your domain registrar (e.g. where you bought `yourdomain.com`):

| Record | Name | Target |
|--------|------|--------|
| CNAME | `senterez` (or `@`) | Vercel DNS (shown in Vercel dashboard) |
| CNAME | `api.senterez` | Render DNS (shown in Render dashboard) |

---

## Step 5 — Verify

1. Open `https://senterez.yourdomain.com`
2. Register a new account (or login with admin after seed)
3. Create a game — Socket.IO should connect to `api.senterez.yourdomain.com`
4. Open browser DevTools → Network → confirm API calls go to API subdomain

---

## Local development

```bash
nvm use 18
cd server && npm install && node server.js   # port 3311 HTTPS
# separate terminal:
npm install && npm run dev                   # port 8080, Dev mode → :3311
```

---

## Environment reference

### Vercel (frontend build)

```
API_URL=https://api.senterez.yourdomain.com
```

### Render (backend)

```
NODE_ENV=production
USE_HTTPS=false
TRUST_PROXY=true
JWT_SECRET=<secret>
MONGO_URL=mongodb+srv://...
ALLOWED_ORIGINS=https://senterez.yourdomain.com
SEED_INITIAL_ADMIN=true
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong>
ADMIN_EMAIL=admin@innosphere.et
```

---

## Free tier limits

| Service | Limit | Impact |
|---------|-------|--------|
| Render free | Spins down after 15 min idle | First visit after idle takes ~30s to wake |
| MongoDB Atlas M0 | 512 MB storage | Fine for demo / early launch |
| Vercel hobby | 100 GB bandwidth/month | Fine for moderate traffic |

For Ethio Telecom production traffic, upgrade Render and Atlas to paid tiers.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Login works but multiplayer doesn't | Check `API_URL` in Vercel matches Render URL |
| CORS errors | Set `ALLOWED_ORIGINS` on Render to exact Vercel domain |
| Socket connection failed | Ensure Render service is awake; check browser console |
| `JWT_SECRET must be set` | Add `JWT_SECRET` in Render env vars |
| Build fails on Vercel | Set Node.js version to **18.x** in project settings |

---

## Contact

InnoSphere Technologies — contact@innosphere.et
