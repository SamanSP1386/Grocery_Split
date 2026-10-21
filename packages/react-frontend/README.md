# Grocery Split — Frontend

This is the web app for Grocery Split, built with React and Vite.

## Getting started

From the repo root, install everything once:

```bash
pnpm install
```

Copy the environment variables template

```bash
cp .env.example .env
```

Then start the dev server from here (`packages/react-frontend`):

```bash
pnpm dev
```

This opens the app at `http://localhost:5173` with hot reload, so changes show up right away.

Other useful commands:

```bash
pnpm build     # type-check and build for production
pnpm preview   # preview the production build locally
pnpm lint      # run eslint
pnpm format    # run prettier
```

## What's in here

- **React + TypeScript**, bundled with **Vite**.
- **React Router**, in [data mode](https://reactrouter.com/start/data/routing) — routes are defined
  as data (see `src/main.tsx`) rather than as JSX, which lets us hook up loaders/actions per route
  later on.
- **Hono RPC**, typed api client, importing the `@grocery-split/api` router type
- **shadcn/ui** for components, built on top of **Tailwind CSS**. Components live in
  `src/components/ui` and are meant to be copied/edited directly rather than installed as a
  black-box package — use the shadcn CLI to add new ones.
- Set up as a **PWA** (installable, works offline) via `vite-plugin-pwa`.

## Project layout

```
src/
├── routes/        # page components, wired up to routes in main.tsx
├── components/ui/ # shadcn/ui components
├── lib/           # shared helpers (e.g. cn() for merging classNames)
└── main.tsx       # app entry point, router setup
```
