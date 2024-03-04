import path from 'node:path';
import { SequelizeStorage, Umzug } from 'umzug';
import { sequelize } from './sequelize';

export const umzug = new Umzug({
  migrations: {
    glob: [
      'migrations/*/**.{ts,js}',
      {
        cwd: path.resolve(__dirname, '..'),
      },
    ],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, timestamps: true }),
  // Prevent logging to console
  logger: undefined,
});
