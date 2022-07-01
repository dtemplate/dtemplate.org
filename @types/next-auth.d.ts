import 'next-auth';

declare module 'next-auth' {
  interface Session {
    account: {
      _id: string;
      provider: string;
      type: string;
      providerAccountId: string;
      access_token: string;
      token_type: string;
      scope: string;
      userId: string;
    };
    githubProfile: {
      avatar_url: string;
      bio: string;
      blog: string;
      company?: string;
      created_at: string;
      email: string;
      events_url: string;
      followers: number;
      followers_url: string;
      following: number;
      following_url: string;
      gists_url: string;
      gravatar_id: string;
      hireable?: boolean;
      html_url: string;
      id: number;
      location: string;
      login: string;
      name: string;
      node_id: string;
      organizations_url: string;
      public_gists: number;
      public_repos: number;
      received_events_url: string;
      repos_url: string;
      site_admin: boolean;
      starred_url: string;
      subscriptions_url: string;
      twitter_username?: string;
      type: string;
      updated_at: string;
      url: string;
      _id: string;
    };
    user: {
      email: string;
      image: string;
      name: string;
    };
  }
}
