import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DB_DIALECT: z
    .string()
    .refine(
      (dialect) => {
        const dialects: Dialect[] = [
          'mysql',
          'postgres',
          'sqlite',
          'mariadb',
          'mssql',
          'db2',
          'snowflake',
          'oracle',
        ] as const;

        return dialects.includes(dialect as never);
      },
      {
        message: 'Invalid dialect',
        path: ['DB_DIALECT'],
      }
    )
    .transform((dialect) => dialect as Dialect),
  DB_PORT: z
    .string()
    .refine((port) => !Number.isNaN(Number(port)), {
      message: 'Invalid port',
      path: ['DB_PORT'],
    })
    .transform((port) => Number(port)),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string().default(''),
  DB_DATABASE: z.string(),
  DB_HOST: z.string(),
});

export default envSchema.parse(process.env);
