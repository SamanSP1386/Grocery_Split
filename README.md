# Grocery Split

Grocery Split is a web application for roommates to coordinate grocery shopping and split costs fairly, including the cost of shared bulk items.

## About

Roommates often need a better way to coordinate grocery purchases, plan shopping trips, and work out who owes what. Grocery Split brings shared grocery tracking and expense splitting together so groups can plan purchases and see each person's share.

### Features

- Track groceries shared by a roommate group including cost, amount, and requesters.
- Organize groceries into trips, with a shopping list for each trip.
- Review group IOUs and see how grocery costs are split, including bulk items.

These describe the product goals; the frontend and API are not yet connected.

## Project Structure

- `packages/react-frontend`: React and Vite web application
- `packages/express-backend`: Express API, developed with Cloudflare Wrangler
- `packages/db`: Drizzle schema and Cloudflare D1 migrations
- `packages/validation`: Shared TypeScript types and Zod schemas

See [`architecture.md`](architecture.md) for more about the package boundaries.

## Getting Started

Requirements: Node.js 22 or newer and pnpm 11.22.0. The root package configuration pins pnpm.

Install dependencies from the repository root:

```bash
pnpm install
```

To update an existing checkout, run these commands from the repository root:

```bash
git pull
pnpm install
```

Database migrations are only needed when working with D1 or changing the database schema; see [`packages/db/README.md`](packages/db/README.md).

### Run Locally

There is no root `start` or `dev` command. Start the frontend and API separately, each in its own terminal from the repository root:

```bash
pnpm --filter @grocery-split/react-frontend dev
```

```bash
pnpm --filter @grocery-split/express-backend dev
```

Open the URL printed by Vite to view the frontend. It currently displays a placeholder and does not use the API, so these commands do not yet run a connected Grocery Split application. The API runs separately through Wrangler.

## Tests

Automated tests are not configured yet. No test command is currently available.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidelines.
