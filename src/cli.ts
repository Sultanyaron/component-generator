import { Args } from "./types";
import { promptOptions } from "./utils/promptOptions";
import { generateComponent } from "./utils/generateComponent";
import { consoleFolderStructure } from "./utils/consoleUtils";

export async function cli(args: Args) {
  const promptAnswers = await promptOptions();

  const destinationPath = `${process.cwd()}/${promptAnswers.componentName}`;

  await generateComponent(promptAnswers, destinationPath);

  consoleFolderStructure(destinationPath);
}

// TODOS
// create different combinations
//  - Custom (Test, Story, Style, Types)
// add eslint
// add prettier
// write tests
// readme
