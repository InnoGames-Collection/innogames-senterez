# Senterez — Ethio Telecom Submission Pack

**Product:** Senterez (ሰንጠረዥ)  
**Version:** 1.0.0  
**Developer / Operator:** InnoSphere Technologies  
**Commercial partner:** Ethio Telecom  
**License:** GNU Affero General Public License v3.0 (AGPL-3.0)  
**Date:** June 2026

---

## 1. Executive summary

Senterez is an open-source online multiplayer chess platform for Ethio Telecom
subscribers. InnoSphere Technologies develops, hosts, and operates the service
on InnoSphere infrastructure in partnership with Ethio Telecom for commercial
distribution.

The application provides real-time chess, computer opponent, spectator mode,
chat, and puzzles. It contains **no advertising** and **no third-party analytics**.

## 2. Architecture

```
┌─────────────┐     HTTPS (TLS)      ┌──────────────────┐
│   Browser   │ ◄─────────────────► │  nginx / LB      │
│  (Vue.js)   │                     │  (telecom CA)    │
└─────────────┘                     └────────┬─────────┘
                                             │
                                    ┌────────▼─────────┐
                                    │  Senterez API    │
                                    │  Node.js + HTTPS │
                                    │  Socket.IO       │
                                    └────────┬─────────┘
                                             │
                                    ┌────────▼─────────┐
                                    │  MongoDB         │
                                    │  (senterez DB)   │
                                    └──────────────────┘
```

| Component | Technology | Hosted by |
|-----------|------------|-----------|
| Web client | Vue.js 1, Webpack | InnoSphere CDN / static |
| API server | Express, Socket.IO | InnoSphere |
| Database | MongoDB | InnoSphere |
| TLS | Ethio Telecom CA or Let's Encrypt | InnoSphere edge |

**No external runtime dependencies:** production HTML loads only same-origin
JavaScript and CSS bundles. No Google Analytics, ad networks, or social embeds.

## 3. Ownership & licensing

| Item | Status |
|------|--------|
| Application fork | Derived from vue-chess (ISC); maintained by InnoSphere as Senterez |
| Product branding | Senterez ሰንጠረዥ — InnoSphere Technologies |
| License | AGPL-3.0 (full text in LICENSE) |
| Chess piece sets | Reused from lichess ecosystem; documented in THIRD_PARTY_NOTICES.md |
| Source availability | AGPL-3.0 requires offering source to network users |

See [NOTICE.md](../NOTICE.md) and [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).

## 4. Security controls implemented

| Control | Implementation |
|---------|----------------|
| JWT authentication | Environment-configured `JWT_SECRET` (required in production) |
| Password hashing | bcrypt |
| Default credentials removed | No hardcoded admin/yoyo; bootstrap via env vars only |
| HTTPS | TLS at reverse proxy in production |
| No ads / tracking | Verified — none in source or HTML shell |
| File upload restrictions | Extension and size checks in chat controller |
| Dependency audit | Documented; remediation plan in SECURITY.md |

## 5. Known limitations & 90-day roadmap

| Item | Status | Target |
|------|--------|--------|
| Legacy dependency CVEs | Documented in npm audit | Pin upgrades in v1.1 |
| Garbochess engine license | Undocumented in bundle | Replace with Stockfish WASM |
| Vue 1 / Socket.IO 1 | End-of-life stack | Migrate to Vue 3 / Socket.IO 4 in v2.0 |
| Penetration test | Pending | Post-approval |
| Ethio Telecom SSO (OIDC) | Pending platform spec | v1.2 |
| Rate limiting | Planned | v1.1 |

## 6. Data handling

| Data type | Storage | Retention |
|-----------|---------|-----------|
| User accounts | MongoDB | Until account deletion |
| Game records (PGN) | MongoDB | Persistent |
| Chat messages | MongoDB | Persistent |
| Uploaded files | Server filesystem | Per retention policy |
| Audit logs | Server logs | 90 days (planned) |

**Data controller:** InnoSphere Technologies (operator)  
**Commercial distributor:** Ethio Telecom

## 7. Deployment checklist

- [ ] Set `NODE_ENV=production`
- [ ] Set strong `JWT_SECRET`
- [ ] Configure telecom CA certificate on nginx
- [ ] Set `SEED_INITIAL_ADMIN=true` for first deploy only
- [ ] Build and deploy frontend static assets
- [ ] Start MongoDB with authentication enabled
- [ ] Disable self-signed SSL in production
- [ ] Publish source repository URL for AGPL compliance

## 8. Demo access

Provide Ethio Telecom reviewers with:

- Production or staging URL (HTTPS)
- Test user credentials (not default admin/yoyo)
- Repository URL containing LICENSE, NOTICE, and this document

## 9. Contact

**InnoSphere Technologies**  
Email: contact@innosphere.et
