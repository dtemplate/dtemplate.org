export class GetUserReposFromUsernameService {
  githubAccessToken?: string;

  constructor(githubAccessToken?: string) {
    this.githubAccessToken = githubAccessToken;
  }

  async execute(username: string): Promise<any> {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: this.githubAccessToken
            ? `${this.githubAccessToken}`
            : '',
        },
      },
    );
    const repos = await response.json();
    return repos;
  }
}
