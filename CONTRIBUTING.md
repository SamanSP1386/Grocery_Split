# Contributing

## Tools

- Using pnpm instead of npm.

## How to contribute

- Report bugs by opening an issue.
- Suggest features in an issue before starting major work.
- Submit fixes and improvements through pull requests.

## Development setup

- Requires Node.js v22+ (the backend and db packages run `.ts` files directly
  via Node's built-in TypeScript support) and pnpm (version is pinned in the
  root `package.json`'s `devEngines`; pnpm/corepack will offer to install the
  right version automatically if you don't have it).
- Clone the repo, then install dependencies for all workspace packages from
  the repo root:
  ```bash
  pnpm install
  ```
  This also sets up the Husky git hooks via the `prepare` script.
- This is a pnpm workspace with three packages under `packages/`:
  `react-frontend`, `express-backend`, and `db`. Run a package's scripts with
  `pnpm --filter <package-name> <script>`, e.g.:
  ```bash
  pnpm --filter @grocery-split/react-frontend dev   # Vite dev server
  pnpm --filter @grocery-split/express-backend dev  # API server (defaults to port 3000)
  ```
- The `db` package talks to Cloudflare D1 via Drizzle; see
  `packages/db/README.md` for generating/applying migrations and the
  `.env` variables needed to connect to a live database.

## Formatting

- Formatting will automatically be applied on commit.

## Commit message format

- `<type>: <concise message with impertive mood>`
  - i.e: "feat: add search filtering options", "fix: fix bug blocking signin on windows devices"
