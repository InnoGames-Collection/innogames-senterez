# Senterez Security Posture

**Product:** Senterez (ሰንጠረዥ)  
**Maintainer:** InnoSphere Technologies  
**License:** AGPL-3.0

---

## Authentication

| Mechanism | Detail |
|-----------|--------|
| Protocol | JWT (Bearer token in Authorization header) |
| Secret | `JWT_SECRET` environment variable — **required in production** |
| Token lifetime | 3 days |
| Password storage | bcrypt hashed |
| Socket auth | JWT passed as query parameter; validated server-side |

### Removed vulnerabilities (v1.0.0)

- Hardcoded JWT secret (`GUSTA_O0000`) — **removed**
- Default administrator `admin` / `yoyo` — **removed**
- Automatic seeding of 20 demo users — **removed**

### Initial admin bootstrap

Only when `SEED_INITIAL_ADMIN=true` and the database is empty:

```
ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL
```

Disable after first deploy: `SEED_INITIAL_ADMIN=false`.

---

## Transport security

| Environment | TLS |
|-------------|-----|
| Development | Self-signed certificate in `server/ssl/` |
| Production | **Must** use Ethio Telecom CA or Let's Encrypt via nginx reverse proxy |

---

## Application security

| Area | Current state | Planned |
|------|---------------|---------|
| Input validation | Basic server-side checks | Zod/class-validator (v1.1) |
| Rate limiting | Not implemented | API gateway / express-rate-limit (v1.1) |
| CORS | Same-origin default | Explicit allowlist (v1.1) |
| Security headers | Not set | Helmet.js CSP/HSTS (v1.1) |
| File upload | Extension + size limits | Virus scan integration (v1.2) |
| Chat content | Unfiltered | Moderation pipeline (v2.0) |

---

## Dependency security

The project uses legacy npm packages (Vue 1, Socket.IO 1, Mongoose 4-era).
Known vulnerabilities are tracked via `npm audit`.

**Do not run `npm audit fix --force`** — it breaks Socket.IO client/server
compatibility.

### Remediation plan

| Priority | Action | Timeline |
|----------|--------|----------|
| P0 | Pin Node.js 18 LTS in production | Immediate |
| P0 | Environment secrets (JWT, admin) | Immediate (done) |
| P1 | Pin dependency versions in lockfile | 30 days |
| P1 | Replace Garbochess with licensed engine | 60 days |
| P2 | Upgrade to Vue 3 + Socket.IO 4 | 90–120 days |
| P2 | External penetration test | Post Ethio Telecom approval |

Generate SBOM:

```bash
cd server && npm sbom --omit dev --sbom-format cyclonedx
```

---

## Network profile

Production Senterez makes **no outbound calls** to:

- Advertising networks
- Analytics services (Google Analytics, etc.)
- Social media SDKs
- External CDNs for JavaScript or CSS

Optional bundled Google Charts (`server/public/build/charts/`) is self-hosted.
Remove this directory if activity charts are not required for submission.

---

## Reporting security issues

Contact InnoSphere Technologies: contact@innosphere.et

Do not disclose vulnerabilities publicly until patched.

---

## AGPL-3.0 note

Network users of Senterez may request corresponding source code under AGPL-3.0.
Publish the repository URL in the application About dialog and submission pack.
