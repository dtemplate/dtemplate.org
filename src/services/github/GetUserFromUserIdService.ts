export class GetUserFromUserIdService {
  githubAccessToken?: string;

  constructor(githubAccessToken?: string) {
    this.githubAccessToken = githubAccessToken;
  }

  async execute(userId: number): Promise<any> {
    const response = await fetch(`https://api.github.com/user/${userId}`, {
      headers: {
        Authorization: this.githubAccessToken
          ? `${this.githubAccessToken}`
          : '',
      },
    });
    const user = await response.json();
    return user;
  }
}
