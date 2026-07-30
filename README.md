# Testflow Security Assessment MVP

A React (Vite) single-page app for a small-business security assessment,
backed by a minimal Node.js/Express API and PostgreSQL.

## Stack

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Express (`server/`)
- **Database**: PostgreSQL
- **Containerization**: Docker / Docker Compose
- **Cloud**: AWS (ECS Fargate + RDS + ECR — see `infra/aws/`)

## Local development

```bash
npm install
cp .env.example .env

# frontend (Vite dev server)
npm run dev

# backend API (separate terminal)
npm run server:dev
```

## Run with Docker Compose

Builds the app image (frontend build + Express server) and starts a local
PostgreSQL instance:

```bash
docker compose up --build
```

The app is served at http://localhost:8080, with health checks at
`/api/health` and `/api/db-health`.

## Analytics

Product analytics events land in the `analytics_events` table (see
`server/migrations/0001_create_analytics_events.sql`, apply it against
`DATABASE_URL` before relying on capture in an environment).

- `POST /api/analytics/events` — generic capture endpoint. Body:
  `{ "event": "website_visit" | "demo_request" | "email_open", "properties": {} }`.
  The frontend calls this via `src/analytics.js` (`trackEvent`), currently
  wired up for page-load website visits and the "Request a demo" form.
- `GET /api/analytics/pixel.gif?campaign=...` — 1x1 tracking pixel that logs
  an `email_open` event. Not yet embedded anywhere: there is no outbound
  email-sending integration in this repo yet, so wire this into email
  templates once one exists.

## Deployment

See `infra/aws/README.md` for the suggested AWS architecture and the
`.github/workflows/deploy-aws.yml` workflow that builds and pushes the
Docker image to ECR and deploys it to ECS.
