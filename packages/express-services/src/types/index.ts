import type { Encoding } from 'crypto';

export interface RepoInfo {
  author: string;
  repository: string;
  branch: string;
  rootName: string;
  urlPrefix: string;
  urlSufix: string;
  url: string;
  downloadPath: string;
  token?: string;
}

export interface CreateRepoInfo
  extends Partial<Omit<RepoInfo, 'urlSufix' | 'urlPrefix'>> {}

export interface LinkInfo {
  self: string;
  git: string;
  html: string;
}

export interface ContentInfo {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  _links: LinkInfo;
}

export interface FileInfo extends ContentInfo {
  download_url: string;
  type: 'file';
  encoding: Encoding;
}

export interface DirectoryInfo extends ContentInfo {
  download_url: null;
  type: 'dir';
}

export type GithubContent = DirectoryInfo | FileInfo;
