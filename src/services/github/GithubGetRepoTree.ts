import { Octokit } from '@octokit/core';
import { IGithubRepoTree } from '../../interfaces/IGithub';

export class GithubGetRepoTree {
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
    repoFullName: string,
    branch: string,
  ): Promise<IGithubRepoTree[]> {
    const tree: IGithubRepoTree[] = [];
    const response = await this.octokit.request(
      'GET /repos/:owner/:repo/git/trees/:sha',
      {
        owner: repoFullName.split('/')[0],
        repo: repoFullName.split('/')[1],
        sha: branch,
      },
    );

    for (const item of response.data.tree) {
      let treeItem: IGithubRepoTree = {} as IGithubRepoTree;

      if (item.type === 'blob') {
        treeItem = {
          path: item.path,
          mode: item.mode,
          type: item.type,
          sha: item.sha,
          size: item.size,
          url: item.url,
          children: [],
        };
      }

      if (item.type === 'tree') {
        treeItem = {
          path: item.path,
          mode: item.mode,
          type: item.type,
          sha: item.sha,
          size: item.size,
          url: item.url,
          children: await this.execute(repoFullName, item.sha),
        };
      }

      tree.push(treeItem);
    }

    return tree;
  }
}
