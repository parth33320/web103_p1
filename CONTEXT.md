# Agentic AI Frameworks & Developer Tools Listicle

A web application highlighting the top 10 Agentic AI Frameworks and Developer Tools using vanilla HTML, CSS (Pico.css), and JavaScript with an Express backend and structured audit logging.

## Language

**Listicle Item**:
A curated developer tool or framework relevant to building autonomous agentic AI applications (e.g., LangGraph, MCP, Neo4j, Groq).
_Avoid_: Card, entry, article

**Item Detail Page**:
A dedicated webpage displaying comprehensive specs, use cases, architecture roles, and documentation links for a single Listicle Item.
_Avoid_: Popup page, external view

**Card Grid View**:
An interactive, multi-column visual layout presenting Listicle Items with category badges, rating badges, and quick preview modal overlays.
_Avoid_: Table view, list view

**Audit Log**:
An append-only JSONL record tracking user interactions, page navigation, and API requests across the system.
_Avoid_: Access log, console log

**Tracer Bullet**:
An end-to-end slice spanning schema/JSON store -> Express REST API -> Pico.css Vanilla UI -> Automated Tests.
_Avoid_: Prototype, mock backend

## Relationships

- A **Listicle Item** has exactly one **Item Detail Page**.
- The **Card Grid View** renders all active **Listicle Items** with dynamic search and filtering.
- Every API request and navigation event emits an entry to the **Audit Log**.
