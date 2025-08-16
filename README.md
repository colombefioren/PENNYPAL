<div align="center">
  <h1 style="margin-bottom: 0.25rem;">Expense Tracker</h1>
  <p style="margin-top: 0; color: #6b7280;">Monorepo containing a React (Vite) client and an Express server.</p>
  <p>
    <img alt="React" src="https://img.shields.io/badge/Client-React%20%2B%20Vite-61dafb?logo=react&logoColor=white" />
    <img alt="Express" src="https://img.shields.io/badge/Server-Express-000000?logo=express&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" />
  </p>
</div>

<h2>Structure</h2>

```
expense-tracker/
  client/   # React + TS + Vite app (UI library + Storybook)
  server/   # Express API server
```

<h2>Tech Stack</h2>

- Client: React 18, TypeScript, Vite, Tailwind CSS, Storybook
- Server: Node.js, Express, PostgreSQL (via pg), Helmet, CORS, Morgan

<h2>Quick Start</h2>

1) Server

```bash
cd server
cp .env.example .env  # edit values as needed
npm install
npm run dev
```

By default: http://localhost:8080 (configure CORS_ORIGIN to your client URL)

2) Client

```bash
cd client
npm install
npm run dev
```

Vite dev server runs on http://localhost:5173 by default.

3) Storybook (optional)

```bash
cd client
npm run storybook
```

<h2>Documentation</h2>

- Client README: ./client/README.md
- Server README: ./server/README.md

<h2>Environment</h2>

- Server env template: `server/.env.example`
- Key vars: `PORT`, `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`

<!-- Project-specific contribution guidelines and CI/CD details live outside this file. -->