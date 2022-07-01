import { Octokit } from '@octokit/core';

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

  async execute(
    url: string,
    {
      convertToJSON,
    }: {
      convertToJSON: boolean;
    },
  ): Promise<string | any> {
    const response = await this.octokit.request(
      'GET /repos/:owner/:repo/git/blobs/:sha',
      {
        owner: url.split('/')[4],
        repo: url.split('/')[5],
        sha: url.split('/')[8],
      },
    );
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
