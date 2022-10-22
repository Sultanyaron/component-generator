import fsModule from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { PromptAnswers, CustomTemplateChoice } from "../types";

const fs = fsModule.promises;
const getTemplatePath = (templatePath: string) => {
  return path.resolve(
    path.dirname(decodeURI(fileURLToPath(import.meta.url))),
    `../templates/${templatePath}`
  );
};

const readTemplate = async (templatePath: string) => {
  return await fs.readFile(getTemplatePath(templatePath), "utf8");
};

const lowerCaseFirstLetter = (value: string) =>
  `${value[0].toLowerCase()}${value.slice(1)}`;

const getComponentSetupName = (componentName: string) =>
  `${lowerCaseFirstLetter(componentName)}Setup`;

const getComponentTestUtilsName = (componentName: string) =>
  `${lowerCaseFirstLetter(componentName)}TestUtils`;

const replaceComponentName = (template: string, componentName: string) =>
  template.replace(/TemplateComponentName/g, componentName);

const replaceTestSetupName = (template: string, componentName: string) =>
  template.replace(/componentSetup/g, getComponentSetupName(componentName));

const replaceTestUtilsName = (template: string, componentName: string) =>
  template.replace(
    /componentNameTestUtils/g,
    getComponentTestUtilsName(componentName)
  );

const readTemplateAndApplyComponentName = async (
  templatePath: string,
  componentName: string
) => {
  const template = await readTemplate(templatePath);
  return replaceComponentName(template, componentName);
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

const saveTemplateToDestination = async (
  destinationDirPath: string,
  fileName: string,
  template: string
) => {
  await fs.mkdir(destinationDirPath, { recursive: true });
  await fs.writeFile(`${destinationDirPath}/${fileName}`, template, "utf8");
};

export const generateComponent = async (promptAnswers: PromptAnswers) => {
  const isDefaultTemplate = promptAnswers.template === "default";
  const didCheckTemplateChoice = (templateChoice: CustomTemplateChoice) =>
    promptAnswers.customTemplateChoices?.includes(templateChoice) || false;
  const destinationComponentPath = `${process.cwd()}/${
    promptAnswers.componentName
  }`;

  await fs.mkdir(`${destinationComponentPath}/hooks`, { recursive: true });
  await fs.mkdir(`${destinationComponentPath}/components`, { recursive: true });

  const componentTemplate = await readTemplateAndApplyComponentName(
    "TemplateComponent.tsx.template",
    promptAnswers.componentName
  );
  await saveTemplateToDestination(
    destinationComponentPath,
    `${promptAnswers.componentName}.tsx`,
    componentTemplate
  );

  const componentStyleTemplate = await readTemplate(
    "TemplateComponent.style.ts.template"
  );
  await saveTemplateToDestination(
    destinationComponentPath,
    `${promptAnswers.componentName}.style.ts`,
    componentStyleTemplate
  );

  if (isDefaultTemplate || didCheckTemplateChoice("story")) {
    const storyTemplate = await readTemplateAndApplyComponentName(
      "TemplateComponent.stories.tsx.template",
      promptAnswers.componentName
    );
    await saveTemplateToDestination(
      destinationComponentPath,
      `${promptAnswers.componentName}.stories.tsx`,
      storyTemplate
    );
  }

  if (isDefaultTemplate || didCheckTemplateChoice("test")) {
    // copy test
    const componentTestTemplate = await readComponentTestAndApplyNames(
      promptAnswers.componentName
    );

    await saveTemplateToDestination(
      `${destinationComponentPath}/__tests__`,
      `${promptAnswers.componentName}.test.ts`,
      componentTestTemplate
    );
    // copy setup
    const testSetupTemplate = await readComponentSetupAndApplyNames(
      promptAnswers.componentName
    );

    await saveTemplateToDestination(
      `${destinationComponentPath}/utils/test-utils`,
      `${getComponentSetupName(promptAnswers.componentName)}.tsx`,
      testSetupTemplate
    );

    // copy utils
    const testUtilsTemplate = await readComponentTestUtilsAndApplyNames(
      promptAnswers.componentName
    );
    await saveTemplateToDestination(
      `${destinationComponentPath}/utils/test-utils`,
      `${getComponentTestUtilsName(promptAnswers.componentName)}.ts`,
      testUtilsTemplate
    );
  }
};
