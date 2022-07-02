export interface ITemplateConfig {
  name: string;
  description: string;
  commands: string[];
}

export interface ITemplateGithubRepository {
  full_name: string;
  default_branch: string;
  id: number;
  url: string;
  treeUrl: string;
}

export interface ITemplate {
  _id: string;
  githubRepository: ITemplateGithubRepository;
  templateConfiguration: ITemplateConfig;
  baseTemplateRepositoryTreeUrl: string;
  configurationFileTreeUrl: string;
  userOwnId: string;
  createdAt: Date;
  updatedAt: Date;
}
