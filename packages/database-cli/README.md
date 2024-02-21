# Database CLI

Create Database Seeders and Migrations with Sequelize Database Engine, Umzug

## Installation

```bash
pnpm i -D @digital-envision/database-cli
```

## Usage

1. Create cli file in your project directory

```bash
touch src/cli/database.ts
```

> In this example, we assume that `src` is your project directory.

> You can the locatino of the file wherever you want. But in the following example onwards we will assumes that you use `src/cli/database.ts` as the location.

2. Modify the `database.ts` file by creating `DatabaseCli` instance

```ts
import { DatabaseCli } from '@digital-envision/database-cli';

// Pass your Umzug instance here
const cli = new DatabaseCli(umzug);

cli.execute();
```

> In this example, we assume that `umzug` is your umzug instance and you want to create a migration cli.

3. Add the following `scripts` in your `package.json`

```json
"migrate": "tsx src/cli/database.ts migrate --type migration",
"migrate:create": "tsx src/cli/database.ts create --type migration",
"migrate:up": "pnpm run migrate --action up",
"migrate:down": "pnpm run migrate --action down",
"migrate:to": "pnpm run migrate --action to",
"migrate:revert": "pnpm run migrate --action revert",
"migrate:latest": "pnpm run migrate --action latest",
```

> The above example are only applying the `migrations` command.

> We assume that you use `tsx` for your typescript runner and `pnpm` for your package manager.

> Please change accordingly if you are using another runner or package manager.

Extra:

1. If you want to use the seeders, do the step from 1 to 3. But, in the step 3 pass the Umzug instance for seeder instead to the `DatabaseCli` instance.

2. Add the following `scripts` in your `package.json`

```json
"seed": "tsx src/cli/database.ts migrate --type seeder",
"seed:create": "tsx src/cli/database.ts create --type seeder",
"seed:up": "pnpm run seed --action up",
"seed:down": "pnpm run seed --action down",
"seed:to": "pnpm run seed --action to",
"seed:revert": "pnpm run seed --action revert",
"seed:latest": "pnpm run seed --action latest",
```
