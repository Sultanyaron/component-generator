import { CustomTemplateChoice } from '../types';

const lowerCaseFirstLetter = (value: string) => `${value[0].toLowerCase()}${value.slice(1)}`;

export const getComponentSetupName = (componentName: string) =>
  `${lowerCaseFirstLetter(componentName)}Setup`;

export const getComponentTestUtilsName = (componentName: string) =>
  `${lowerCaseFirstLetter(componentName)}TestUtils`;

export const replaceComponentName = (template: string, componentName: string) =>
  template.replace(/TemplateComponentName/g, componentName);

export const replaceTestSetupName = (template: string, componentName: string) =>
  template.replace(/componentSetup/g, getComponentSetupName(componentName));

export const replaceTestUtilsName = (template: string, componentName: string) =>
  template.replace(/componentNameTestUtils/g, getComponentTestUtilsName(componentName));

export const getTemplateChoiceChecker =
  (customTemplateChoices: CustomTemplateChoice[]) => (templateChoice: CustomTemplateChoice) =>
    customTemplateChoices?.includes(templateChoice) || false;
