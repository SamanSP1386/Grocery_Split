# @grocery-split/db

Defines the Cloudflare D1 database models and SQL migrations using
[Drizzle ORM](https://orm.drizzle.team/).

## Set Up Environment Variables

```bash
cp .env.example .env
```

Fill out the properties

```properties
# These values are only required to push changes to the live database, or connect to the live database

# Go to Workers & Pages -> Overview -> copy Account ID from the right sidebar.
CLOUDFLARE_ACCOUNT_ID=
# Open the D1 database you want to connect to and copy Database ID
CLOUDFLARE_DATABASE_ID=
# Go to My profile -> API Tokens and create token with D1 edit permissions.
CLOUDFLARE_D1_TOKEN=
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

Applies any new migrations to the connected database, requires the .env vars to be filled out.

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
