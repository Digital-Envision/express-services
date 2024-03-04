import fs from 'node:fs';
import path from 'node:path';
import type { StaticModel } from './base-model';
import { TableName } from '../utils/constant';

export type Database = Record<TableName, StaticModel>;

const dbs = {} as Database;
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    const isBaseModel = file.startsWith('base-model');
    const isIndex = file === basename;

    return file.indexOf('.') !== 0 && !isIndex && !isBaseModel;
  })
  .forEach((file) => {
    const db = require(path.join(__dirname, file)).default as StaticModel;

    Object.assign(dbs, {
      [db.name]: db,
    });
  });

// Run associations
Object.keys(dbs).forEach((model) => {
  dbs[model].associate?.(dbs);
});

export { dbs };
