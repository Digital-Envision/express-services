import {
  CommandLineAction,
  CommandLineChoiceParameter,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';
import { GeneratorType } from '../utils/constant';
import { generator } from '../utils/generator';

export class CreateMigrationCli extends CommandLineAction {
  private name!: CommandLineStringParameter;
  private writePath!: CommandLineStringParameter;
  private type!: CommandLineChoiceParameter;

  constructor() {
    super({
      actionName: 'create',
      summary: 'Create a new migration/seeder.',
      documentation: 'Create a new migration/seeder.',
    });
  }

  protected onDefineParameters(): void {
    this.name = this.defineStringParameter({
      argumentName: 'NAME',
      parameterLongName: '--name',
      description: 'The name of the migration file',
      required: true,
    });

    this.writePath = this.defineStringParameter({
      argumentName: 'OUTPUT',
      parameterLongName: '--output',
      description: 'The path to the output directory',
      required: true,
    });

    this.type = this.defineChoiceParameter({
      alternatives: [GeneratorType.MIGRATION, GeneratorType.SEEDER],
      description: 'Type of the file to generate',
      parameterLongName: '--type',
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    if (!this.name.value || !this.writePath.value || !this.type.value) {
      throw new Error('Name, write path, and type are required');
    }

    return generator({
      name: this.name.value,
      type: this.type.value as GeneratorType,
      writePath: this.writePath.value,
    });
  }
}
