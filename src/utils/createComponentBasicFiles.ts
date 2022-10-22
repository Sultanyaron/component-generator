import { readTemplate, saveTemplateToDestination } from './fileUtils';
import { replaceComponentName } from './templateUtils';

const readTemplateAndApplyComponentName = async (templatePath: string, componentName: string) => {
  const template = await readTemplate(templatePath);
  return replaceComponentName(template, componentName);
};

export const createComponentBasicFiles = async (destinationPath: string, componentName: string) => {
  const componentTemplate = await readTemplateAndApplyComponentName(
    'TemplateComponent.tsx.template',
    componentName
  );
  await saveTemplateToDestination(destinationPath, `${componentName}.tsx`, componentTemplate);

  const componentStyleTemplate = await readTemplate('TemplateComponent.style.ts.template');
  await saveTemplateToDestination(
    destinationPath,
    `${componentName}.style.ts`,
    componentStyleTemplate
  );
};
