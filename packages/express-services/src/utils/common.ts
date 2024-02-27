import path from 'node:path';
import type { CreateRepoInfo, GithubContent, RepoInfo } from '../types';
import { DIR_NAME, REPO_AUTHOR, REPO_BRANCH, REPO_NAME } from './constant';

export function createRepoInfo(config: CreateRepoInfo) {
  const info: RepoInfo = {
    author: config?.author ?? REPO_AUTHOR,
    branch: config?.branch ?? REPO_BRANCH,
    repository: config?.repository ?? REPO_NAME,
    rootName: config?.rootName ?? DIR_NAME,
    get urlPrefix() {
      return `https://api.github.com/repos/${this.author}/${this.repository}/contents`;
    },
    get urlSufix() {
      return `?ref=${this.branch}`;
    },
    get url() {
      if (config.url) return config.url;

      const { urlPrefix, urlSufix } = this;
      const url = `${urlPrefix}/${this.rootName}${urlSufix}`;

      return url;
    },
    downloadPath: config.downloadPath ?? '',
    token: config?.token,
  };

  return info;
}

export function createDownloaderRepoInfo(
  prevInfo: RepoInfo,
  content: GithubContent
) {
  const downloadPath = path.join(prevInfo.downloadPath, content.name);

  switch (content.type) {
    case 'dir':
      return createRepoInfo({
        ...prevInfo,
        rootName: content.path,
        downloadPath: path.join(prevInfo.downloadPath, content.name),
      });

    case 'file': {
      return createRepoInfo({
        ...prevInfo,
        downloadPath,
        url: content.download_url,
        rootName: content.path,
      });
    }

    default:
      return null;
  }
}
