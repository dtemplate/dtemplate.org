import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { CreateTemplateService } from './services/CreateTemplateService';
import { GetCodeFromTemplate } from './services/GetCodeFromTemplate';
import { GetTemplateByNameService } from './services/GetTemplateByNameService';
import { ListAllTemplatesService } from './services/ListAllTemplatesService';

export class TemplateController {
  public async publish(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);

    const { body } = req;
    try {
      const createTemplateService = new CreateTemplateService();
      const result = await createTemplateService.execute(
        body,
        session?.account.userId || '',
      );

      res.status(201).json({
        result,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  public async listAll(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { page, limit, order, search } = req.query;
      const listAllTemplates = new ListAllTemplatesService();
      const result = await listAllTemplates.execute({
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        order: order as string,
        search: search as string,
      });

      res.status(200).json({
        result,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  public async getTemplateByName(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { templateName } = req.query;
      if (!templateName) {
        return res.status(400).json({
          error: 'Missing templateName',
        });
      }
      const getTemplateByNameService = new GetTemplateByNameService();
      const result = await getTemplateByNameService.execute(
        templateName as string,
      );

      return res.status(200).json({
        result,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  public async getCodeTemplateByName(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try {
      const { templateName, base } = req.query;
      const getCodeFromTemplate = new GetCodeFromTemplate();
      const result = await getCodeFromTemplate.execute(templateName as string, {
        getFromBaseStructure: !!base,
      });

      res.status(200).json({
        result,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
