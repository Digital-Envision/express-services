import fs from 'node:fs/promises';
import path from 'node:path';
import type { DirectoryInfo, GithubContent, RepoInfo } from '../types';
import { createDownloaderRepoInfo } from './common';

function getRequestHeader(repoInfo: RepoInfo) {
  const headers: Record<string, string> = {};

  if (repoInfo.token) {
    headers.Authorization = `token ${repoInfo.token}`;
  }

  return headers;
}

function validateStatus(response: Response) {
  switch (response.status) {
    case 401: {
      throw new Error('Invalid token');
    }

    case 403: {
      if (response.headers.get('X-RateLimit-Remaining') === '0') {
        throw new Error('Rate limit exceeded');
      }

      break;
    }

    case 404: {
      throw new Error('Repository not found');
    }

    default:
      break;
  }
}

export async function downloadFile(repoInfo: RepoInfo) {
  const headers = getRequestHeader(repoInfo);
  const response = await globalThis.fetch(repoInfo.url, {
    headers,
  });

  validateStatus(response);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.mkdir(path.dirname(repoInfo.downloadPath), { recursive: true });
  await fs.writeFile(repoInfo.downloadPath, buffer);
}

export async function downloadDirectory(repoInfo: RepoInfo) {
  const headers = getRequestHeader(repoInfo);
  const response = await globalThis.fetch(repoInfo.url, {
    headers,
  });

  validateStatus(response);

  let contents = (await response.json()) as GithubContent | GithubContent[];
  contents = Array.isArray(contents) ? contents : [contents];

  await fs.mkdir(repoInfo.downloadPath, { recursive: true });

  contents.forEach(async (content) => {
    switch (content.type) {
      case 'dir': {
        const newRepoInfo = createDownloaderRepoInfo(repoInfo, content);
        await downloadDirectory(newRepoInfo!);
        break;
      }

      case 'file': {
        const newRepoInfo = createDownloaderRepoInfo(repoInfo, content);
        await downloadFile(newRepoInfo!);
        break;
      }

      default:
        break;
    }
  });
}

export async function getAvailableServices(repoInfo: RepoInfo) {
  const headers = getRequestHeader(repoInfo);
  const response = await globalThis.fetch(repoInfo.url, {
    headers,
  });

  validateStatus(response);

  let contents = (await response.json()) as DirectoryInfo[];
  contents = Array.isArray(contents) ? contents : [contents];

  return contents.map((content) => content.name);
}
