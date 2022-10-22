import { PromptAnswers } from "../types";
import { createComponentBasicFiles } from "./createComponentBasicFiles";
import { createStoryFile } from "./createStoryFile";
import { createTestFileAndUtils } from "./createTestFileAndUtils";
import { getTemplateChoiceChecker } from "./templateUtils";

export const generateComponent = async (
  promptAnswers: PromptAnswers,
  destinationPath: string
) => {
  const isDefaultTemplate = promptAnswers.template === "default";
  const didCheckTemplateChoice = getTemplateChoiceChecker(
    promptAnswers.customTemplateChoices
  );

  await createComponentBasicFiles(destinationPath, promptAnswers.componentName);

  if (isDefaultTemplate || didCheckTemplateChoice("story")) {
    await createStoryFile(destinationPath, promptAnswers.componentName);
  }

  if (isDefaultTemplate || didCheckTemplateChoice("test")) {
    await createTestFileAndUtils(destinationPath, promptAnswers.componentName);
  }
};
