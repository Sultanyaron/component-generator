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
      message: "Please choose template type",
      choices: [
        {
          name: "Reusable component (Styles, types, tests and a story)",
          value: "reuseable",
        },
        { name: "Component with test", value: "withTest" },
        { name: "Custom (Choose your files)", value: "custom" },
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
      ],
    },
  ];

  const answers = await inquirer.prompt(questions);

  return answers;
}
