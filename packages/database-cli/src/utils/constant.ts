import path from 'node:path';

export enum MigrationType {
  UP = 'up',
  DOWN = 'down',
  TO = 'to',
  REVERT = 'revert',
  LATEST = 'latest',
}

export enum GeneratorType {
  SEEDER = 'seeder',
  MIGRATION = 'migration',
}

export const ROOT_PATH = path.resolve(__dirname, '../..');
export const TEMPLATE_PATH = path.resolve(ROOT_PATH, 'template');
