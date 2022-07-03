import { GithubGetRepoTree } from '../../../services/github/GithubGetRepoTree';
import clientPromise from '../../../../lib/mongodb';
import { ITemplate } from '../../../interfaces/ITemplate';
import * as mongodb from 'mongodb';
import { GithubGetFileContentFromUrl } from '../../../services/github/GithubGetFileContentFromUrl';

interface getOptions {
  getReadme?: boolean;
}

export class GetTemplateByNameService {
  public async execute(name: string, options?: getOptions) {
    const mongoClient = await clientPromise;
    const db = await mongoClient.db();
    const template: ITemplate | any = await db
      .collection('templates')
      .findOne({ 'templateConfiguration.name': name });

    if (options?.getReadme) {
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
      const readmeTree = githubRepoTree.find(item => item.path === 'README.md');
      if (!readmeTree) {
        return {
          ...template,
          readme: 'README.md not found',
        };
      }
      const githubGetFileContentFromUrl = new GithubGetFileContentFromUrl(
        userOwnAccount?.access_token || '',
      );
      const readmeContent = await githubGetFileContentFromUrl.execute(
        readmeTree.url,
        {
          convertToJSON: false,
        },
      );
      return {
        ...template,
        readme: readmeContent,
      };
    }

    return template;
  }
}
