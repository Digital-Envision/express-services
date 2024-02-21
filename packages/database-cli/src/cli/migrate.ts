import {
  CommandLineAction,
  CommandLineChoiceParameter,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';
import { MigrationMeta, Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';
import { GeneratorType, MigrationType } from '../utils/constant';

export class MigrateMigrationCli extends CommandLineAction {
  private action!: CommandLineChoiceParameter;
  private type!: CommandLineChoiceParameter;
  private target!: CommandLineStringParameter;
  private umzug: Umzug<QueryInterface> | null;

  constructor(umzug: Umzug<QueryInterface> | null = null) {
    super({
      actionName: 'migrate',
      summary: 'Run sequelize migration/seeder.',
      documentation: 'Run sequelize migration/seeder.',
    });

    this.umzug = umzug;
  }

  protected onDefineParameters(): void {
    this.action = this.defineChoiceParameter({
      alternatives: [
        MigrationType.UP,
        MigrationType.DOWN,
        MigrationType.LATEST,
        MigrationType.REVERT,
        MigrationType.TO,
      ],
      description: 'Type of migration actions',
      parameterLongName: '--action',
      defaultValue: MigrationType.UP,
    });

    this.target = this.defineStringParameter({
      argumentName: 'TARGET',
      parameterLongName: '--target',
      description: 'Target migration name',
    });

    this.type = this.defineChoiceParameter({
      alternatives: [GeneratorType.MIGRATION, GeneratorType.SEEDER],
      description: 'Type of the file to generate',
      parameterLongName: '--type',
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    if (!this.umzug) {
      throw new Error('Umzug instance is required');
    }

    if (!this.type.value) {
      throw new Error('Type is required');
    }

    const { umzug } = this;
    let migrations: Promise<MigrationMeta[]>;
    let migrationType: MigrationType = MigrationType.UP;

    switch (this.action.value) {
      case MigrationType.UP:
        if (this.target.value) {
          migrations = umzug.up({
            migrations: [this.target.value],
          });
        } else {
          migrations = umzug.up();
        }

        migrationType = MigrationType.UP;
        break;

      case MigrationType.DOWN:
        if (this.target.value) {
          migrations = umzug.down({
            migrations: [this.target.value],
          });
        } else {
          migrations = umzug.down();
        }

        migrationType = MigrationType.DOWN;
        break;

      case MigrationType.TO:
        if (!this.target.value) {
          throw new Error('Target migration name is required');
        }

        migrations = umzug.up({
          to: this.target.value,
        });
        migrationType = MigrationType.TO;
        break;

      case MigrationType.REVERT:
        migrations = umzug.down({
          step: (await umzug.executed()).length,
        });
        migrationType = MigrationType.REVERT;
        break;

      case MigrationType.LATEST:
      default:
        migrations = umzug.up();
        migrationType = MigrationType.UP;
        break;
    }

    return this.handleMigration(migrations, migrationType);
  }

  protected async handleMigration(
    migration: Promise<MigrationMeta[]>,
    action: MigrationType = MigrationType.UP
  ) {
    const type = this.type.value!;
    const prefix = type === GeneratorType.MIGRATION ? 'migration' : 'seeder';
    const metas = await migration;

    switch (action) {
      case MigrationType.TO: {
        console.log(`${prefix} move to "${metas[metas.length - 1].name}"`);
        break;
      }

      case MigrationType.REVERT:
        console.log(`${prefix} reverted`);
        break;

      default: {
        metas.forEach(({ name }) => {
          console.log(
            `${prefix} "${name}:${action}" was executed successfully`
          );
        });
        break;
      }
    }
  }
}
