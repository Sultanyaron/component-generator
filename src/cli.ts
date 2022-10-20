import { Args } from "./types";
import { promptOptions } from "./utils/promptOptions";
import { generateComponent } from "./utils/generateComponent";

export async function cli(args: Args) {
  const options = await promptOptions();
  console.log(options);

  await generateComponent(options.componentName);
}
