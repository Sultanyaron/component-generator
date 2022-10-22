import { readTemplate, saveTemplateToDestination } from "./fileUtils";
import {
  replaceComponentName,
  replaceTestSetupName,
  replaceTestUtilsName,
  getComponentSetupName,
  getComponentTestUtilsName,
} from "./templateUtils";

export const createTestFileAndUtils = async (
  destinationPath: string,
  componentName: string
) => {
  const componentTestTemplate = await readComponentTestAndApplyNames(
    componentName
  );

  await saveTemplateToDestination(
    `${destinationPath}/__tests__`,
    `${componentName}.test.ts`,
    componentTestTemplate
  );
  const testSetupTemplate = await readComponentSetupAndApplyNames(
    componentName
  );

  await saveTemplateToDestination(
    `${destinationPath}/utils/test-utils`,
    `${getComponentSetupName(componentName)}.tsx`,
    testSetupTemplate
  );

  const testUtilsTemplate = await readComponentTestUtilsAndApplyNames(
    componentName
  );
  await saveTemplateToDestination(
    `${destinationPath}/utils/test-utils`,
    `${getComponentTestUtilsName(componentName)}.ts`,
    testUtilsTemplate
  );
};

const readComponentSetupAndApplyNames = async (componentName: string) => {
  let template = await readTemplate("componentSetup.ts.template");
  template = replaceComponentName(template, componentName);
  template = replaceTestSetupName(template, componentName);
  template = replaceTestUtilsName(template, componentName);
  return template;
};

const readComponentTestAndApplyNames = async (componentName: string) => {
  let template = await readTemplate("TemplateComponent.test.ts.template");
  template = replaceComponentName(template, componentName);
  template = replaceTestSetupName(template, componentName);
  template = replaceTestUtilsName(template, componentName);
  return template;
};

const readComponentTestUtilsAndApplyNames = async (componentName: string) => {
  let template = await readTemplate("componentTestUtils.ts.template");
  template = replaceTestUtilsName(template, componentName);
  return template;
};
