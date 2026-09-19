# 0001 Local Storage and Append-Only Audit Logging

## Context
The application requires persistent storage for listicle items (top 10 agentic AI frameworks and tools) and an audit trail recording system interactions and API requests.

## Decision
We choose a local JSON file (`data/items.json`) for items data and an append-only JSONL file (`data/audit.jsonl`) for audit logging.

## Consequences
- **Simplicity**: Zero external database setup overhead.
- **Auditability**: JSONL allows fast append operations (`fs.appendFile`) for every API request without re-writing the whole dataset.
- **Portability**: Codebase remains self-contained and reproducible.
