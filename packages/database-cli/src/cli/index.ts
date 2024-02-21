import { CommandLineParser } from '@rushstack/ts-command-line';
import { Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';
import { CreateMigrationCli } from './create';
import { MigrateMigrationCli } from './migrate';

export class DatabaseCli extends CommandLineParser {
  constructor(umzug: Umzug<QueryInterface> | null = null) {
    super({
      toolDescription: 'Database CLI.',
      toolFilename: 'database-cli',
    });
    this.addAction(new CreateMigrationCli());
    this.addAction(new MigrateMigrationCli(umzug));
  }
}
