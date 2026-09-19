# Web103 Project 1 - Top 10 Agentic AI Frameworks & Developer Tools

Submitted by: **Jules**

About this web app: **Top 10 Agentic AI Frameworks & Developer Tools** is a web application designed for AI engineers and developers to discover, compare, and inspect modern frameworks (LangGraph, MCP, Groq, Cursor, Neo4j, PyTorch, ChromaDB, Docker, GitHub Codespaces, Repomix). Built with vanilla HTML/CSS (Pico.css) and JavaScript, backed by a Node.js/Express REST server and append-only audit logging.

Time spent: **4** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework** (2pts)
- [x] **Front page of web app is functional and appropriately styled** (7pts)
  - [x] Displays a list of 10 agentic AI frameworks/tools
  - [x] Includes title, summary, category badge, and rank
- [x] **Each list item has a corresponding page** (6pts)
  - [x] Clicking an item navigates to `item.html?id=<id>` displaying full specs, description, highlights, and doc links
- [x] **The webpage is appropriately styled with Picocss** (2pts)

The following **stretch** features are implemented:

- [x] **List items are displayed in a unique format** (2pts)
  - [x] Interactive Card Grid View with dynamic real-time keyword search, category filtering, and rank/alphabetical sorting
  - [x] Quick Preview Modal overlay to inspect key highlights without leaving the front page

## Video Walkthrough / Demo GIF

Here is a walkthrough of the application:

![Demo GIF](public/demo.gif)

## SDLC & Architecture Documentation

- **Ubiquitous Language**: Defined in [`CONTEXT.md`](CONTEXT.md)
- **Architecture & Full Call Stack Diagrams**: See [`ARCHITECTURE.md`](ARCHITECTURE.md)
- **Architecture Decision Records**: See [`docs/adr/0001-local-storage-and-audit-logging.md`](docs/adr/0001-local-storage-and-audit-logging.md)
- **Vertical Slice Issues**: Tracked under `.scratch/agentic-listicle/`
- **Audit Logging**: Append-only JSONL log file stored in `data/audit.jsonl` and accessible via `/api/audit-logs`

## License

    Copyright [2026] [Jules]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,Receipt or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
