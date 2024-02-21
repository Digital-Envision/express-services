import fs from 'node:fs';
import path from 'node:path';
import { GeneratorType, TEMPLATE_PATH } from './constant';
import { createPrefix, startCase } from './common';

type Param<T extends GeneratorType> = {
  name: string;
  writePath: string;
  type: T;
};

export function generator<T extends GeneratorType>(param: Param<T>) {
  const { name, type, writePath } = param;
  const prefix = createPrefix();

  const fileName = `${prefix}-${name}.ts`;
  const destDir = path.resolve(writePath);
  const destPath = path.resolve(destDir, fileName);
  const srcPath = path.resolve(TEMPLATE_PATH, `${type}.ts`);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, {
      recursive: true,
    });
  }

  console.log(`Creating ${type}...`);

  fs.copyFileSync(srcPath, destPath);

  console.log(`${startCase(type)} created!`);
}
