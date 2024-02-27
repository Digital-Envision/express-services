import {
  CommandLineParser,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';
import { createRepoInfo } from '../utils/common';
import { DIR_NAME } from '../utils/constant';
import { downloadDirectory, getAvailableServices } from '../utils/downloader';

export class ExpressServices extends CommandLineParser {
  private downloadPath: CommandLineStringParameter;
  private serviceName: CommandLineStringParameter;
  private githubToken: CommandLineStringParameter;

  constructor() {
    super({
      toolDescription: '@digital-envision/Express Services Downloader',
      toolFilename: 'express-services',
    });

    this.downloadPath = this.defineStringParameter({
      argumentName: 'PATH',
      parameterLongName: '--path',
      parameterShortName: '-p',
      description: 'The path to the download directory',
      required: true,
    });

    this.serviceName = this.defineStringParameter({
      argumentName: 'NAME',
      parameterLongName: '--name',
      parameterShortName: '-n',
      description: 'The name of the service to download',
      required: true,
    });

    this.githubToken = this.defineStringParameter({
      argumentName: 'TOKEN',
      parameterLongName: '--token',
      description: 'Github token',
      required: false,
    });
  }

  protected async onExecute() {
    if (!this.downloadPath.value || !this.serviceName.value) {
      throw new Error('Path and name are required');
    }

    const availableServices = await getAvailableServices(
      createRepoInfo({
        token: this.githubToken.value,
      })
    );

    if (!availableServices.includes(this.serviceName.value)) {
      throw new Error(
        `Service not found\nAvailable services: ${availableServices.join(', ')}\n`
      );
    }

    const repoInfo = createRepoInfo({
      rootName: [DIR_NAME, this.serviceName.value].join('/'),
      downloadPath: this.downloadPath.value,
      token: this.githubToken.value,
    });

    await downloadDirectory(repoInfo);
  }
}
