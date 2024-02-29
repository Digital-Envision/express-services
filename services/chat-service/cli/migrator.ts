import { DatabaseCli } from 'database-cli';
import { umzug } from '../sequelize/umzug';

const cli = new DatabaseCli(umzug);

cli.execute();
