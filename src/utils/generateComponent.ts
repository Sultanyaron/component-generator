import { PromptAnswers } from '../types';
import { createReusableComponent } from './premadeTemplateGenerators/createReuseableComponent';
import { createHooksAndComponentsFolders } from './fileUtils';
import { createWithTestComponent } from './premadeTemplateGenerators/createWithTestComponent';

export const generateComponent = async (promptAnswers: PromptAnswers, destinationPath: string) => {
  // const isDefaultTemplate = promptAnswers.template === "reuseable";
  // const didCheckTemplateChoice = getTemplateChoiceChecker(
  //   promptAnswers.customTemplateChoices
  // );

  await createHooksAndComponentsFolders(destinationPath);
  // await createComponentBasicFiles(destinationPath, promptAnswers.componentName);

  if (promptAnswers.template === 'reuseable') {
    await createReusableComponent(destinationPath, promptAnswers.componentName);
  }

  if (promptAnswers.template === 'withTest') {
    await createWithTestComponent(destinationPath, promptAnswers.componentName);
  }

  if (promptAnswers.template === 'custom') {
    console.log('Will be supported soon');
  }
};
