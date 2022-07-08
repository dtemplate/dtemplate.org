import clientPromise from '../../../../lib/mongodb';
import * as mongodb from 'mongodb';
import { GithubGetRepoTree } from '../../../services/github/GithubGetRepoTree';
import { GetTemplateByNameService } from './GetTemplateByNameService';
import { GithubGetFileContentFromUrl } from '../../../services/github/GithubGetFileContentFromUrl';
import { IGithubRepoTree } from '../../../interfaces/IGithub';
import { GithubGetRepoTreeFromUrl } from '../../../services/github/GithubGetRepoTreeFromUrl';

interface IOptions {
  getFromBaseStructure: boolean;
}

export class GetCodeFromTemplate {
  public async execute(templateName: string, options?: IOptions) {
    if (!options?.getFromBaseStructure) {
      return await this.executeFromAll(templateName);
    }

    return this.executeFromBaseStructure(templateName);
  }

  private async executeFromAll(templateName: string) {
    const mongoClient = await clientPromise;
    const db = await mongoClient.db();

    const getTemplateByNameService = new GetTemplateByNameService();
    const template = await getTemplateByNameService.execute(templateName);
    const userOwnAccount = await db.collection('accounts').findOne({
      userId: new mongodb.ObjectId(template.userOwnId),
    });
    const githubGetRepoTree = new GithubGetRepoTree(
      userOwnAccount?.access_token || '',
    );
    const githubRepoTree = await githubGetRepoTree.execute(
      template.githubRepository.full_name,
      template.githubRepository.default_branch,
    );

    const result = await this.getContentFromGithubTree({
      githubRepoTree,
      userOwnGithubToken: userOwnAccount?.access_token || '',
    });

    return result;
  }

  private async executeFromBaseStructure(templateName: string) {
    const mongoClient = await clientPromise;
    const db = await mongoClient.db();

    const getTemplateByNameService = new GetTemplateByNameService();
    const template = await getTemplateByNameService.execute(templateName);
    const userOwnAccount = await db.collection('accounts').findOne({
      userId: new mongodb.ObjectId(template.userOwnId),
    });
    const { baseTemplateRepositoryTreeUrl } = template;

    const githubGetRepoTreeFromUrl = new GithubGetRepoTreeFromUrl(
      userOwnAccount?.access_token || '',
    );
    const githubRepoTree = await githubGetRepoTreeFromUrl.execute(
      baseTemplateRepositoryTreeUrl,
    );

    const result = await this.getContentFromGithubTree({
      githubRepoTree,
      userOwnGithubToken: userOwnAccount?.access_token || '',
    });

    return result;
  }

  private async getContentFromGithubTree({
    githubRepoTree,
    userOwnGithubToken,
  }: {
    githubRepoTree: IGithubRepoTree[];
    userOwnGithubToken: string;
  }) {
    const resultFiles = [];

    for (const item of githubRepoTree) {
      if (item.type === 'tree') {
        const content: any = await this.getContentFromGithubTree({
          githubRepoTree: item.children,
          userOwnGithubToken,
        });
        resultFiles.push({
          name: item.path,
          children: content,
          content: '',
          type: item.type,
        });
        continue;
      }

      const githubGetFileContentFromUrl = new GithubGetFileContentFromUrl(
        userOwnGithubToken || '',
      );
      const content = await githubGetFileContentFromUrl.execute(item.url, {
        convertToJSON: false,
        noConvertoToUtf8: true,
      });
      resultFiles.push({
        name: item.path,
        content: content.replace(/\n/g, ''),
        children: [],
        type: item.type,
      });
    }

    return resultFiles;
  }
}
