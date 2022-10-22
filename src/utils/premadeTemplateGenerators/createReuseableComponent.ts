import { createComponentBasicFiles } from '../createComponentBasicFiles';
import { createStoryFile } from '../createStoryFile';
import { createTestFileAndUtils } from '../createTestFileAndUtils';

export const createReusableComponent = async (destinationPath: string, componentName: string) => {
  await createComponentBasicFiles(destinationPath, componentName);
  await createStoryFile(destinationPath, componentName);
  await createTestFileAndUtils(destinationPath, componentName);
  // TODO
  // types
};
