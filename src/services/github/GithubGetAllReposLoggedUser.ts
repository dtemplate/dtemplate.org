import { Octokit } from '@octokit/core';

export class GithubGetAllReposLoggedUser {
  octokit: any;

  constructor(githubAccessToken: string) {
    if (!githubAccessToken) {
      throw new Error('Github access token is required');
    }

    this.octokit = new Octokit({
      auth: githubAccessToken,
    });
  }

  async execute(): Promise<any> {
    const { data: repos } = await this.octokit.request('GET /user/repos', {});
    return repos;
  }
}
