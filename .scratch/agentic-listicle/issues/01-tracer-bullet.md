# Issue 01: Tracer Bullet Pipe (Data -> API -> UI -> Tests)

Status: ready-for-agent

## What to build
Set up the core Express server, `data/items.json` schema, audit logging module, and a initial front page serving items from `/api/items`.

## Acceptance Criteria
- [ ] Server runs on port 3000 (or dynamic port) with `npm start`.
- [ ] `/api/items` returns list of 10 Agentic AI tools in JSON.
- [ ] Front page (`/`) fetches items and renders using Pico.css.
- [ ] Audit log records request to `data/audit.jsonl`.
