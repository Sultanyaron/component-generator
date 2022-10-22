import { readTemplate, saveTemplateToDestination } from "./fileUtils";
import { replaceComponentName } from "./templateUtils";

const readStoryAndApplyComponentName = async (componentName: string) => {
  const template = await readTemplate("TemplateComponent.stories.tsx.template");
  return replaceComponentName(template, componentName);
};

export const createStoryFile = async (
  destinationPath: string,
  componentName: string
) => {
  const storyTemplate = await readStoryAndApplyComponentName(componentName);

  await saveTemplateToDestination(
    destinationPath,
    `${componentName}.stories.tsx`,
    storyTemplate
  );
};
