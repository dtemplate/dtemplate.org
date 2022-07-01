import { validateTypesAndKeysJson } from '../../../utils/validateTypesAndKeysJson';
import clientPromise from '../../../../lib/mongodb';
import * as mongodb from 'mongodb';

interface createTemplateData {
  githubRepository: {
    full_name: string;
    default_branch: string;
    id: number;
    treeUrl: string;
  };
  baseTemplateRepositoryTreeUrl: string;
  configurationFileTreeUrl: string;
  templateConfiguration: {
    name: string;
    description: string;
    commands: string[];
  };
}

export class CreateTemplateService {
  async execute(params: createTemplateData, userId: string) {
    const allParametersAreValid = this.validateParams(params);
    if (!allParametersAreValid) {
      throw new Error('Invalid fields in params');
    }

    const mongoClient = await clientPromise;
    const db = await mongoClient.db();
    const templateNameAreInUse = await db.collection('templates').findOne({
      'templateConfiguration.name': params.templateConfiguration.name,
    });

    if (templateNameAreInUse) {
      throw new Error(
        'Template name is in use, choose another one in your config file',
      );
    }

    const { insertedId } = await db.collection('templates').insertOne({
      ...params,
      userOwnId: new mongodb.ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const template = await db.collection('templates').findOne({
      _id: new mongodb.ObjectId(insertedId),
    });

    return template;
  }

  validateParams(params: createTemplateData) {
    return validateTypesAndKeysJson(params, {
      githubRepository: {
        full_name: 'string',
        default_branch: 'string',
        id: 'number',
        url: 'string',
        treeUrl: 'string',
      },
      baseTemplateRepositoryTreeUrl: 'string',
      configurationFileTreeUrl: 'string',
      templateConfiguration: {
        name: 'string',
        description: 'string',
        commands: 'object',
      },
    });
  }
}
