# Simple React Analytics (Web Analytics + Heatmaps)

Privacy-first, full-stack analytics suite with heatmaps, A/B testing, REST API backend, and a React dashboard. Tracks clicks, movements, and hover/linger interactions without PII.  

> Oregon State University — CS 406 (Summer 2025)  
> Project by Sahil Gaikwad  

---

## Features

- Heatmap rendering of interactions (click, move, hover)  
- A/B testing support (`label` = "A" | "B")  
- Dashboard with:
  - Variant toggle  
  - Light/dark themes and accent color selector  
  - Weekly click/session graph  
  - Numerical metrics (sessions, total clicks)  
  - Heatmap display with refresh  
  - JSON import/export + PNG download  
- Modular capture scripts for clicks, moves, and hover/linger events  
- REST API (Express + MongoDB)  

---

## Project Structure

```
client/                  # React dashboard
  src/
    components/          # Header, HeatMap, GraphDisplay, etc.
    App.js               # main dashboard
    config.js            # API_BASE_URL
    data/                # sample/seed data

server/                  # Express backend
  index.js               # API routes (/api/click, /api/heatmap)
  db.js                  # MongoDB connection
  seed.js                # seed script to empty database

capture-lib/             # standalone capture scripts
  capture-click.js
  capture-linger.js
  test.html              # test harness page

scripts/                 # simple test posts (post.js)

public/                  # static files

.env.example             # sample env config
README.md
```

---

## Requirements

- Node.js 18+  
- npm or pnpm  
- MongoDB running locally  

---

## Quick Start

### 1) Clone and install

```bash
git clone <your-repo-url> simple-react-analytics
cd simple-react-analytics
npm install
```

### 2) Environment variables

Create `.env` in the root:

```
MONGO_URI=mongodb+srv://Admin:d2NCZMhYj27fxwA5@cluster0.dpq6rpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=analytics
```

### 3) Run

```bash
# Start backend API (port 4000)
node server/index.js

# Start React dashboard
cd client
npm install
npm start
```

- API -> http://localhost:4000  
- Dashboard -> http://localhost:3000 (React dev server default)  
- Testing Click captures -> Open '/capture-lib/test.html' in your browser

---

## API Reference

### GET /api/heatmap

Fetch clicks (optionally filter by label):

```
GET /api/heatmap?label=A
```

Returns:

```json
[
  { "x": 100, "y": 200, "value": 1, "timestamp": "2025-08-18T18:22:00Z", "label": "A", "sessionId": "uuid" }
]
```

### POST /api/click

Submit interaction events.

Payload must include:  
- `x`, `y` -> coordinates  
- `value` -> weight (1 for click/move, hover duration for linger)  
- `timestamp` -> ISO string or epoch  
- `label` -> `"A"` or `"B"`  
- `sessionId` -> unique session identifier  

**Example:**

```json
{
  "x": 150,
  "y": 2000,
  "value": 10,
  "timestamp": 1723992323111,
  "label": "A",
  "sessionId": "abc123"
}
```

---

## Capture Scripts

Run the 'capture-lib/test.html' for testing purposes. 
For other/custom websites and regular use, see use cases below.

### Click-only

```html
<script>
window.__SRA_CONFIG_API_BASE_URL = 'http://localhost:4000';
window.__SRA_CONFIG_LABEL = 'A';
</script>
<script src="./capture-lib/capture-click.js"></script>
```

### Click + hover + moves (batched)

```html
<script>
window.__SRA_CONFIG_API_BASE_URL = 'http://localhost:4000';
window.__SRA_CONFIG_LABEL = 'B';
</script>
<script src="./capture-lib/capture-combined.js"></script>
```

### Test Harness

Run `capture-lib/test.html` in a browser. It generates lorem paragraphs and logs clicks/moves to your backend.

---

## Development Notes

- Labels restricted to `"A"` or `"B"`  
- Session IDs generated via `sessionStorage` or `crypto.randomUUID()`  
- Hover detection radius ~8px with 600ms linger threshold  
- Move events throttled (~10Hz) and batched every 1s  

---

## License

MIT © 2025 Sahil Gaikwad
