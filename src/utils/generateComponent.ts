import { PromptAnswers } from '../types';
import { createReusableComponent } from './premadeTemplateGenerators/createReuseableComponent';
import { createHooksAndComponentsFolders } from './fileUtils';
import { createWithTestComponent } from './premadeTemplateGenerators/createWithTestComponent';
import { createCustomComponent } from './customComponentGenerator/createCustomComponent';

export const generateComponent = async (promptAnswers: PromptAnswers, destinationPath: string) => {
  await createHooksAndComponentsFolders(destinationPath);

  if (promptAnswers.template === 'reuseable') {
    await createReusableComponent(destinationPath, promptAnswers.componentName);
  }

  if (promptAnswers.template === 'withTest') {
    await createWithTestComponent(destinationPath, promptAnswers.componentName);
  }

  if (promptAnswers.template === 'custom') {
    await createCustomComponent(
      destinationPath,
      promptAnswers.componentName,
      promptAnswers.customTemplateChoices
    );
  }
};
