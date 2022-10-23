import { CustomTemplateChoice } from '../../types';
import { getTemplateChoiceChecker } from '../templateUtils';
import { createTestFileAndUtils } from '../createTestFileAndUtils';
import { createStoryFile } from '../createStoryFile';
import {
  createComponentWithStyle,
  createComponentWithoutImports,
  createComponentWithTypes,
  createComponentWithTypesAndStyle
} from '../createComponentFile';

export const createCustomComponent = async (
  destinationPath: string,
  componentName: string,
  customTemplateChoices: CustomTemplateChoice[]
) => {
  const didCheckTemplateChoice = getTemplateChoiceChecker(customTemplateChoices);
  const [didSelectStyle, didSelectTest, didSelectStory, didSelectTypes] = [
    didCheckTemplateChoice('style'),
    didCheckTemplateChoice('test'),
    didCheckTemplateChoice('story'),
    didCheckTemplateChoice('types')
  ];

  if (didSelectStyle && didSelectTypes) {
    console.log('style+types');
    await createComponentWithTypesAndStyle(destinationPath, componentName);
  } else if (didSelectTypes) {
    console.log('types');
    await createComponentWithTypes(destinationPath, componentName);
  } else if (didSelectStyle) {
    console.log('style');
    await createComponentWithStyle(destinationPath, componentName);
  } else {
    console.log('empty');
    await createComponentWithoutImports(destinationPath, componentName);
  }

  if (didSelectTest) {
    await createTestFileAndUtils(destinationPath, componentName);
  }

  if (didSelectStory) {
    await createStoryFile(destinationPath, componentName);
  }
};
