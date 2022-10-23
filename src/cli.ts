import { Args } from './types';
import { promptOptions } from './utils/promptOptions';
import { generateComponent } from './utils/generateComponent';
import { consoleFolderStructure } from './utils/consoleUtils';

export async function cli(args: Args) {
  const promptAnswers = await promptOptions();

  const destinationPath = `${process.cwd()}/${promptAnswers.componentName}`;

  await generateComponent(promptAnswers, destinationPath);

  consoleFolderStructure(destinationPath);
}

// TODOS
// write tests
// keywords (package.json)
// Fix push issue with Gh action on publish
// Add PR CI
// Add -v arg to get the version
