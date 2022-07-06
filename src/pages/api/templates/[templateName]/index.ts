import nextConnect from 'next-connect';
import { TemplateController } from '../../../../modules/templates/TemplateController';

const templateController = new TemplateController();

export default nextConnect({
  attachParams: true,
}).get(templateController.getTemplateByName);
