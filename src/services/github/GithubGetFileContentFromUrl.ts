import { Octokit } from '@octokit/core';

interface IOptions {
  convertToJSON: boolean;
  noConvertoToUtf8?: boolean;
}

export class GithubGetFileContentFromUrl {
  octokit: any;

  constructor(githubAccessToken: string) {
    if (!githubAccessToken) {
      throw new Error('Github access token is required');
    }

    this.octokit = new Octokit({
      auth: githubAccessToken,
    });
  }

  async execute(url: string, options?: IOptions): Promise<string | any> {
    let convertToJSON = false;
    if (options) {
      convertToJSON = options.convertToJSON;
    }
    const response = await this.octokit.request(
      'GET /repos/:owner/:repo/git/blobs/:sha',
      {
        owner: url.split('/')[4],
        repo: url.split('/')[5],
        sha: url.split('/')[8],
      },
    );

    if (options && options.noConvertoToUtf8) {
      return response.data.content;
    }

    const fileUtf8Content = Buffer.from(
      response.data.content,
      'base64',
    ).toString('utf8');

    if (convertToJSON) {
      return JSON.parse(fileUtf8Content);
    }

    return fileUtf8Content;
  }
}
