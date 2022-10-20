import fsModule, { mkdir } from "fs";
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

const readTemplateAndApplyComponentName = async (
  templatePath: string,
  componentName: string
) => {
  const templateString = await readTemplate(templatePath);
  return templateString.replace(/TemplateComponentName/g, componentName);
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
  // 2. Copy story if relevant
  // 3. Copy test if relevant
  const isDefaultTemplate = promptAnswers.template === "default";
  const didCheckTemplateChoice = (templateChoice: CustomTemplateChoice) =>
    promptAnswers.templateChoices.includes(templateChoice);
  const destinationComponentPath = `${process.cwd()}/${
    promptAnswers.componentName
  }`;

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
};
