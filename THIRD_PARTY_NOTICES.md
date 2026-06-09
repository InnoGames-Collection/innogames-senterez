# Third-Party Notices

Senterez (ሰንጠረዥ) includes the following third-party software and assets.
All items are used in compliance with their respective licenses.

## Upstream application code

| Component | Author | License | Notes |
|-----------|--------|---------|-------|
| vue-chess | Gustavo Crespo Sánchez (gustaYo) | ISC | Forked and maintained as Senterez |

## npm dependencies (summary)

Runtime dependencies are listed in `package.json` and `server/package.json`.
Primary libraries include:

| Package | License | Purpose |
|---------|---------|---------|
| vue | MIT | Frontend framework |
| chess.js | BSD-3-Clause | Chess rules and move validation |
| chessground | GPL-3.0 | Chess board UI |
| express | MIT | HTTP server |
| socket.io | MIT | Real-time multiplayer |
| mongoose | MIT | MongoDB ODM |
| jsonwebtoken | MIT | Authentication tokens |
| moment | MIT | Date/time utilities |
| ejs | Apache-2.0 | Server-side templates |

Generate a full Software Bill of Materials (SBOM) with:

```bash
cd server && npm sbom --omit dev --sbom-format cyclonedx > ../docs/sbom-server.json
npm sbom --omit dev --sbom-format cyclonedx > docs/sbom-frontend.json
```

## Chess piece image sets

Located under `static/images/pieces/`. Reused with documented provenance.

| Set | Format | Provenance | License |
|-----|--------|------------|---------|
| cburnett | SVG | Colin Burnett / lichess.org piece set | CC BY-SA 3.0 |
| merida | SVG | Merida chess piece set (lichess/chessground ecosystem) | See lichess source terms |
| pirouetti | SVG | Community piece set (lichess/chessground ecosystem) | See lichess source terms |
| staunton | PNG | Staunton-style piece set | See lichess source terms |

Attribution: piece artwork originates from the lichess.org open chess ecosystem.
InnoSphere Technologies does not claim copyright over these piece sets.

## Board textures

| Path | Notes |
|------|-------|
| `static/images/board/` | Wood, marble, and themed board backgrounds |

## Fonts

| Font | Path | License |
|------|------|---------|
| Roboto | `static/font/roboto/` | Apache License 2.0 |
| Material Design Icons | `static/font/material-design-icons/` | CC BY-SA 4.0 (see LICENSE.txt in folder) |

## CSS frameworks

| Component | License |
|-----------|---------|
| Materialize CSS | MIT |
| animate.css | MIT |

## Computer opponent engine

| Component | Path | Notes |
|-----------|------|-------|
| Garbochess | `static/libs/garbochess.js` | JavaScript chess engine bundled for vs-PC mode. License not embedded in file; scheduled for replacement with a documented engine in a future release. |

## Google Charts (optional activity charts)

| Component | Path | License |
|-----------|------|---------|
| Google Charts (bundled) | `server/public/build/charts/` | Apache-2.0 (Google). Self-hosted; no runtime CDN dependency in production configuration. |

## No third-party advertising or analytics

Senterez does not include advertising SDKs, analytics trackers, or social media
embeds in the application source or production HTML shell.
