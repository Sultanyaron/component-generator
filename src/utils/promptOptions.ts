import inquirer, { QuestionCollection } from "inquirer";
import { PromptAnswers } from "../types";
import { hasWhiteSpace, isUpperCaseLetter } from "./validations";

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
  ];

  // questions.push({
  //   type: "list",
  //   name: "template",
  //   message: "Please choose which project template to use",
  //   choices: [
  //     { name: "JavaScript", value: "javascript" },
  //     { name: "TypeScript", value: "typescript" },
  //   ],
  //   default: defaultOptions.template,
  // });

  const answers = await inquirer.prompt(questions);

  return answers;
}
