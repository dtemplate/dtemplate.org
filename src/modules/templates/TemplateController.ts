import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { CreateTemplateService } from './services/CreateTemplateService';
import { ListAllTemplates } from './services/ListAllTemplates';

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
      const listAllTemplates = new ListAllTemplates();
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
}
