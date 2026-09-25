# Architecture

## Current Status

The project is in an early scaffolding stage. The repository structure,
build tooling, and code quality checks are configured, but no application
logic has been implemented yet on either the frontend or the backend.

## Project Structure

The repository is a pnpm-managed monorepo containing two packages:

```
Grocery_Split/
├── packages/
│   ├── react-frontend/   # Client application (React + Vite + TypeScript)
│   └── express-backend/  # API server (Express + TypeScript)
│   └── db/               # API server (Drizzle Schema + TypeScript)
├── pnpm-workspace.yaml
└── package.json
```

Each package maintains its own dependencies, TypeScript configuration,
ESLint configuration, and Prettier configuration.

## Frontend — `packages/react-frontend`

- Built with React, Vite, and TypeScript.
- Currently contains the default Vite starter page (a demo counter with
  React and Vite branding) rather than any Grocery Split functionality.
- Provides scripts for local development, production builds, linting, and
  formatting.

## Backend — `packages/express-backend`

- Intended to serve as the Express-based REST API, written in TypeScript.
- The entry point (`src/index.ts`) is currently empty; no server, routes,
  or database connections have been implemented. The `express` package
  itself has not yet been added as a dependency.
- Provides scripts for local development, production builds, linting, and
  formatting, though there is no functional server to run yet.

## DB — `packages/db`

- Defines drizzle models for the database schema, including scripts to create migrations.
- Should be imported by other packages such as the express-backend

## Tooling

- **Husky** manages a pre-commit hook that runs a check across both
  packages before a commit is created.
- **lint-staged** performs formatting and linting on staged files as part
  of that pre-commit check.
- **pnpm** manages dependencies and scripts across both packages via
  workspaces.

## Planned Architecture (per the SRD)

The Software Requirements Specification (`SRD.docx`) is largely an
unfinished template — it still contains placeholder content from an
unrelated example project — but it does specify the following intended
design decisions:

- **Host:** Cloudflare Workers.
- **Database:** Cloudflare D1.
- **API:** A REST API exposed by the Express backend for communication
  with the frontend.
- **Authentication:** Custom OAuth Authentication with Google, Apple, Microsoft, GitHub

None of these components have been implemented in code yet; they
represent the intended direction rather than the current state.

## Recommended Next Steps

1. Define the domain model (groups, participants, grocery items, and
   expense splits) and design the corresponding MySQL schema.
2. Implement the Express server, including routing, database connectivity,
   and authentication middleware.
3. Replace the Vite starter page with the actual Grocery Split UI, wired
   to the backend API.
4. Complete the SRD so it accurately reflects this project rather than
   retaining unrelated placeholder content.
