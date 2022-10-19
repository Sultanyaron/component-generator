import { Args } from "./types";
import { promptOptions } from "./utils/promptOptions";

export async function cli(args: Args) {
  const options = await promptOptions();
  console.log(options);
}
