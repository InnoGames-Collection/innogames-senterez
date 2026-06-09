# GitHub + Vercel + Render — Click-by-click setup

Product: **Senterez (ሰንጠረዥ)**

---

## Part A — Push to GitHub

### A1. Create the GitHub repository (browser)

1. Open [https://github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name:** `senterez` (or `innogames-senterez`)
   - **Description:** `Senterez ሰንጠረዥ — open-source online chess (InnoSphere / Ethio Telecom)`
   - **Visibility:** Public (required for AGPL transparency) or Private for now
   - **Do NOT** add README, .gitignore, or license (already in repo)
3. Click **Create repository**
4. Copy the repo URL, e.g. `https://github.com/YOUR_USERNAME/senterez.git`

### A2. Push from your Mac (terminal)

Replace `YOUR_USERNAME` with your GitHub username:

```bash
cd /Users/yasabneh/Documents/ITG/innogames/Games/vue-chess-master

# If not already done:
git init
git branch -M main

git remote add origin https://github.com/YOUR_USERNAME/senterez.git

git add .
git commit -m "Senterez v1.0: AGPL-3.0 chess platform for InnoSphere / Ethio Telecom"

git push -u origin main
```

If GitHub asks for credentials, use a **Personal Access Token** (not your password):
- GitHub → Settings → Developer settings → Personal access tokens → Generate (classic)
- Scopes: `repo`
- Use the token as the password when `git push` prompts

---

## Part B — MongoDB Atlas (database)

1. [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. **Create** → Shared (M0 Free) → pick region closest to Render (e.g. `eu-west-1` or `us-east-1`)
3. **Database Access** → Add user → username `senterez`, strong password → **Database User**
4. **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`) for demo
5. **Database** → Connect → Drivers → copy connection string:

```
mongodb+srv://senterez:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/senterez?retryWrites=true&w=majority
```

Save this as `MONGO_URL` for Render.

---

## Part C — Render (backend API + Socket.IO)

### C1. Create Web Service

1. [https://dashboard.render.com](https://dashboard.render.com) → sign up with GitHub
2. **New +** → **Blueprint**
3. Connect GitHub → select `senterez` repo
4. Render detects `render.yaml` → **Apply**

### C2. Environment variables (Render dashboard)

Go to **senterez-api** → **Environment**:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | |
| `USE_HTTPS` | `false` | Render terminates TLS |
| `TRUST_PROXY` | `true` | |
| `JWT_SECRET` | *(Generate or paste 64+ random chars)* | **Required** |
| `MONGO_URL` | `mongodb+srv://...` | From Atlas |
| `ALLOWED_ORIGINS` | `https://YOUR-VERCEL-URL.vercel.app` | Update after Vercel deploy |
| `SEED_INITIAL_ADMIN` | `true` | First deploy only |
| `ADMIN_USERNAME` | `admin` | |
| `ADMIN_PASSWORD` | *(strong password)* | |
| `ADMIN_EMAIL` | `admin@innosphere.et` | |

Click **Save Changes** → service redeploys.

### C3. Render build settings (verify)

**Settings** tab:

| Setting | Value |
|---------|-------|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Instance Type | Free |

### C4. Custom domain (optional, after Vercel)

**Settings** → **Custom Domains** → Add `api.yourdomain.com`  
Add the CNAME record Render shows at your DNS provider.

### C5. Copy backend URL

After deploy succeeds, copy the service URL, e.g.:

```
https://senterez-api.onrender.com
```

Use this as `API_URL` in Vercel.

---

## Part D — Vercel (frontend)

### D1. Import project

1. [https://vercel.com/new](https://vercel.com/new) → sign up with GitHub
2. **Import Git Repository** → select `senterez`
3. Configure project:

| Setting | Value |
|---------|-------|
| Framework Preset | **Other** |
| Root Directory | `./` (leave default) |
| Build Command | `npm install && npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### D2. Environment variables (Vercel)

Expand **Environment Variables** before deploying:

| Name | Value | Environments |
|------|-------|--------------|
| `API_URL` | `https://senterez-api.onrender.com` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production only |

Replace with `https://api.yourdomain.com` when custom domain is ready.

### D3. Node.js version

Node.js **24.x** is required on Vercel (via `engines` in root `package.json`).  
For local dev and Render backend, **Node 18** still works.

### D4. Deploy

Click **Deploy**. Wait for build (~2–5 min).

Copy your Vercel URL, e.g. `https://senterez-abc123.vercel.app`

### D5. Update Render CORS

Go back to Render → **Environment** → update:

```
ALLOWED_ORIGINS=https://senterez-abc123.vercel.app
```

Save → redeploy.

### D6. Custom domain (your domain)

**Vercel** → Project → **Settings** → **Domains**:

1. Add `senterez.yourdomain.com` (or `yourdomain.com`)
2. Vercel shows DNS records — add at your registrar:
   - **CNAME** `senterez` → `cname.vercel-dns.com`
   - or **A** record for apex domain (Vercel shows exact values)
3. Wait for SSL (automatic, ~minutes)

Then update:
- Vercel `API_URL` → `https://api.yourdomain.com` (if Render custom domain set)
- Render `ALLOWED_ORIGINS` → `https://senterez.yourdomain.com`

---

## Part E — Verify everything works

1. Open Vercel URL in browser
2. **Register** a new user (or login `admin` / your `ADMIN_PASSWORD` if seeded)
3. Open **DevTools** → **Network** tab
4. Login — requests should go to `senterez-api.onrender.com` (not fail CORS)
5. **Game** → create match — WebSocket should connect (Socket.IO)
6. If Render was idle, first request may take ~30s (free tier wake-up)

---

## Part F — DNS cheat sheet

At your domain registrar (e.g. Ethio Telecom DNS, Cloudflare, Namecheap):

| Type | Host | Value | Service |
|------|------|-------|---------|
| CNAME | `senterez` | *(from Vercel)* | Frontend |
| CNAME | `api.senterez` | *(from Render)* | Backend |

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Vercel build fails | Use Node 24.x in `package.json` engines; check build logs for missing deps |
| `JWT_SECRET must be set` on Render | Add `JWT_SECRET` env var, redeploy |
| CORS error on login | Match `ALLOWED_ORIGINS` exactly to Vercel URL (no trailing slash) |
| Socket.IO fails | Confirm `API_URL` in Vercel; wake Render service |
| MongoDB connection error | Check Atlas IP whitelist and password in URI |
| 502 on Render | Check logs; ensure `USE_HTTPS=false` |

---

## After Ethio Telecom submission

1. Set `SEED_INITIAL_ADMIN=false` on Render
2. Restrict MongoDB Atlas IP to Render outbound IPs (paid) or keep 0.0.0.0/0 for demo
3. Upgrade Render from Free → Starter for always-on service
4. Publish GitHub repo URL in submission pack (`docs/SUBMISSION.md`)
