import { ITemplateConfig } from '../interfaces/ITemplate';

const allowedFields = ['name', 'description', 'commands', 'version'];

export function isInvalidTemplateConfigJsonFields(
  templateConfig: ITemplateConfig,
): false | string {
  const templateConfigFields = Object.keys(templateConfig);
  const invalidFields = templateConfigFields.filter(
    field => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return `Invalid template config fields: ${invalidFields.join(', ')}`;
  }

  if (!templateConfig.name) {
    return `Invalid template config name: ${templateConfig.name}`;
  }

  if (!templateConfig.description) {
    return `Invalid template config description: ${templateConfig.description}`;
  }
  if (!templateConfig.commands) {
    return `Invalid template config commands: ${(
      templateConfig.commands as string[]
    ).join(', ')}`;
  }

  return false;
}
