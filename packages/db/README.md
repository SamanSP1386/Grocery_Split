# @grocery-split/db

Defines the Supabase models and SQL migrations using [Drizzle ORM](https://orm.drizzle.team/).

## Set Up Environment Variables

```bash
cp .env.example .env
```

Fill out the properties

```properties
# Supabase database admin URL (for migrations only)
# Should be a user with admin permission (e.g. postgres) to apply all the migrations
ADMIN_DATABASE_URL=
```

_(Use `postgresql://postgres:postgres@127.0.0.1:54322/postgres` for local db)_

## Run Supabase Locally

(Requires [Docker](https://docs.docker.com/get-started/get-docker/))

Start containers

```bash
pnpm exec supabase start
```

Stop containers

```bash
pnpm exec supabase stop
```

## Create Migrations

Generate migrations based on the schema in code:

```bash
pnpm run db:generate
```

Create a new migration to write custom sql (like triggers or RLS)

```bash
pnpm run db:generate-custom
```

## Apply migrations

Applies any new migrations to the database connected via `ADMIN_DATABASE_URL`

```bash
pnpm run db:migrate
```

## Other Commands

Check the migration files for conflicts
([documentation](https://orm.drizzle.team/docs/drizzle-kit-check))

```bash
pnpm run db:check
```

Open drizzle studio hosted at [local.drizzle.studio](http://local.drizzle.studio) to inspect your
db. ([documentation](https://orm.drizzle.team/docs/drizzle-kit-studio))

```bash
pnpm run db:studio
```
