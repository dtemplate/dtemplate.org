import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { CreateTemplateService } from './services/CreateTemplateService';

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
}
