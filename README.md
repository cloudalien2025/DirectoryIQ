# DirectoryIQ

Standalone public repository for DirectoryIQ.

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL (set `DATABASE_URL`)

## Environment

Create a local `.env.local` (not committed) with at least:

- `DATABASE_URL`
- `INTEGRATIONS_ENCRYPTION_KEY`
- `OPENAI_API_KEY` (for OpenAI-backed generation routes)

Optional:

- `DIRECTORYIQ_OPENAI_TEXT_MODEL`
- `DIRECTORYIQ_OPENAI_IMAGE_MODEL`
- `DIRECTORYIQ_API_BASE`

## Run

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Validation

```bash
npm run typecheck
npm run build
```

## Notes

- This repository is focused on DirectoryIQ workflows.
- Secrets and environment files are excluded from version control.
