import inquirer, { QuestionCollection } from "inquirer";
import { PromptAnswers } from "../types";
import {
  hasWhiteSpace,
  isUpperCaseLetter,
  hasSpecialCharacters,
} from "./validations";

// default values for unspecified args

export async function promptOptions(): Promise<PromptAnswers> {
  const questions: QuestionCollection<PromptAnswers> = [
    {
      type: "input",
      name: "componentName",
      message: "Please provider component name ",
      validate(input: string) {
        if (hasWhiteSpace(input)) {
          return "Component name contains white space, please fix";
        }
        if (hasSpecialCharacters(input)) {
          return "Component name should not include special characters, please fix";
        }
        if (!isUpperCaseLetter(input[0])) {
          return "Component name must start with uppercase letter, please fix";
        }

        return true;
      },
    },
    {
      type: "list",
      name: "template",
      message: "Which type of component",
      choices: [
        { name: "Default", value: "default" },
        { name: "Custom", value: "custom" },
      ],
    },
    {
      type: "checkbox",
      name: "customTemplateChoices",
      message: "Choose what you want",
      when(answers) {
        return answers.template === "custom";
      },
      choices: [
        { name: "Test", value: "test" },
        { name: "Story", value: "story" },
        { name: "Hook", value: "hook" },
      ],
    },
  ];

  const answers = await inquirer.prompt(questions);

  return answers;
}
