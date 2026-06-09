# Senterez ሰንጠረዥ

Open-source online multiplayer chess platform developed by **InnoSphere Technologies**
in partnership with **Ethio Telecom**.

License: [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE)

## Features

- Real-time multiplayer chess (public and private games)
- Play against the computer
- Live spectator mode
- Game invitations and in-game chat
- Chess puzzles (create, solve, and share)
- Customizable board themes and piece sets
- Multilingual UI (Amharic, English, Spanish)

## Partnership

| Role | Organization |
|------|----------------|
| Development & hosting | InnoSphere Technologies |
| Commercial distribution | Ethio Telecom |

## Legal & compliance

| Document | Purpose |
|----------|---------|
| [LICENSE](LICENSE) | AGPL-3.0 license |
| [NOTICE.md](NOTICE.md) | Copyright and upstream attribution |
| [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) | Libraries and asset licenses |
| [docs/SUBMISSION.md](docs/SUBMISSION.md) | Ethio Telecom submission pack |
| [docs/SECURITY.md](docs/SECURITY.md) | Security posture and controls |

This project is derived from [vue-chess](https://github.com/gustaYo/vue-chess) (ISC)
by Gustavo Crespo Sánchez. InnoSphere Technologies maintains Senterez as a
production fork with security hardening and compliance documentation.

## Requirements

- **Node.js 18 LTS** (recommended)
- **MongoDB** 4.x or later
- **OpenSSL** (for HTTPS in development)

## Quick start (development)

```bash
# Use Node 18
nvm use 18

# Install server dependencies
cd server
npm install

# Configure environment (optional for dev)
cp ../.env.example ../.env

# Start MongoDB
brew services start mongodb-community   # macOS

# Start server
node server.js
```

Open the URL printed in the console (HTTPS, port 3311). Accept the self-signed
certificate in development.

For frontend development with hot reload:

```bash
# From project root
npm install
npm run dev
# Set Dev = true in src/main.js
# Run server separately in server/
```

## Deployment (Vercel + Render + MongoDB Atlas)

Senterez uses a **split deployment** — Vercel cannot host the full game alone
because multiplayer requires Socket.IO and MongoDB.

| Component | Host |
|-----------|------|
| Frontend | **Vercel** + your custom domain |
| Backend API + Socket.IO | **Render** (free tier) |
| Database | **MongoDB Atlas** (free tier) |

Full step-by-step guide: **[docs/GITHUB-VERCEL-RENDER-SETUP.md](docs/GITHUB-VERCEL-RENDER-SETUP.md)** (click-by-click dashboard settings)

Architecture overview: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**

Quick summary:

1. Create **MongoDB Atlas** cluster → copy `MONGO_URL`
2. Deploy backend from GitHub to **Render** using `render.yaml`
3. Deploy frontend to **Vercel** with env `API_URL=https://api.yourdomain.com`
4. Point DNS: `senterez.yourdomain.com` → Vercel, `api.senterez.yourdomain.com` → Render

## Production deployment (InnoSphere server)

1. Copy `.env.example` to `.env` and set:

   ```bash
   NODE_ENV=production
   JWT_SECRET=<64+ character random secret>
   MONGO_URL=mongodb://127.0.0.1/senterez
   SEED_INITIAL_ADMIN=true          # first deploy only
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=<strong password>
   ADMIN_EMAIL=admin@innosphere.et
   ```

2. Build frontend and publish static assets:

   ```bash
   npm install
   npm run build
   rm -rf server/public/static
   cp -r dist/static server/public/static
   cp dist/index.html server/views/client.html
   ```

3. Place TLS certificates behind nginx (use Ethio Telecom CA or Let's Encrypt).
   Do not use self-signed certificates in production.

4. Start server with environment loaded:

   ```bash
   cd server && node server.js
   ```

5. After first admin is created, set `SEED_INITIAL_ADMIN=false`.

## Initial administrator

Default demo credentials (`admin` / `yoyo`) have been **removed**.

On first deploy with an empty database, set `SEED_INITIAL_ADMIN=true` and
provide `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_EMAIL` in `.env`.

## No advertising or third-party tracking

Senterez does not include ads, analytics SDKs, or external tracking scripts.

## Contact

InnoSphere Technologies — contact@innosphere.et

## Enjoy Senterez

ሰንጠረዥ — play chess online.
