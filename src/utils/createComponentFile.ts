import { readTemplate, saveTemplateToDestination } from './fileUtils';
import { replaceComponentName } from './templateUtils';

const readTemplateAndApplyComponentName = async (templatePath: string, componentName: string) => {
  const template = await readTemplate(templatePath);
  return replaceComponentName(template, componentName);
};

export const createComponentWithStyleImport = async (
  destinationPath: string,
  componentName: string
) => {
  const componentTemplate = await readTemplateAndApplyComponentName(
    'TemplateComponentWithStyle.tsx.template',
    componentName
  );
  await saveTemplateToDestination(destinationPath, `${componentName}.tsx`, componentTemplate);
};
export const createComponentWithTypeImport = async (
  destinationPath: string,
  componentName: string
) => {
  const componentTemplate = await readTemplateAndApplyComponentName(
    'TemplateComponentWithTypes.tsx.template',
    componentName
  );
  await saveTemplateToDestination(destinationPath, `${componentName}.tsx`, componentTemplate);
};

export const createComponentWithoutImports = async (
  destinationPath: string,
  componentName: string
) => {
  const componentTemplate = await readTemplateAndApplyComponentName(
    'TemplateComponent.tsx.template',
    componentName
  );

  await saveTemplateToDestination(destinationPath, `${componentName}.tsx`, componentTemplate);
};

export const createComponentWithStyleAndTypeImports = async (
  destinationPath: string,
  componentName: string
) => {
  const componentTemplate = await readTemplateAndApplyComponentName(
    'TemplateComponentWithStyleAndTypes.tsx.template',
    componentName
  );
  await saveTemplateToDestination(destinationPath, `${componentName}.tsx`, componentTemplate);
};

export const createStyleFile = async (destinationPath: string, componentName: string) => {
  const styleTemplate = await readTemplateAndApplyComponentName(
    'TemplateComponent.style.ts.template',
    componentName
  );
  await saveTemplateToDestination(destinationPath, `${componentName}.style.ts`, styleTemplate);
};

export const createTypesFile = async (destinationPath: string, componentName: string) => {
  const typesTemplate = await readTemplateAndApplyComponentName(
    'TemplateComponent.types.ts.template',
    componentName
  );

  await saveTemplateToDestination(destinationPath, `${componentName}.types.ts`, typesTemplate);
};

export const createComponentWithStyle = async (destinationPath: string, componentName: string) => {
  await createComponentWithStyleImport(destinationPath, componentName);
  await createStyleFile(destinationPath, componentName);
};

export const createComponentWithTypes = async (destinationPath: string, componentName: string) => {
  await createComponentWithTypeImport(destinationPath, componentName);
  await createTypesFile(destinationPath, componentName);
};

export const createComponentWithTypesAndStyle = async (
  destinationPath: string,
  componentName: string
) => {
  await createComponentWithStyleAndTypeImports(destinationPath, componentName);
  await createStyleFile(destinationPath, componentName);
  await createTypesFile(destinationPath, componentName);
};
