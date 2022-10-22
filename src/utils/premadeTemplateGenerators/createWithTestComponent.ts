import { createComponentBasicFiles } from "../createComponentBasicFiles";
import { createTestFileAndUtils } from "../createTestFileAndUtils";

export const createWithTestComponent = async (
  destinationPath: string,
  componentName: string
) => {
  await createComponentBasicFiles(destinationPath, componentName);
  await createTestFileAndUtils(destinationPath, componentName);
  // TODO
  // style
  // types
};
