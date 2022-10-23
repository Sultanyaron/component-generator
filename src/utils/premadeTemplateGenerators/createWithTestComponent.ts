import { createComponentWithTypesAndStyle } from '../createComponentFile';
import { createTestFileAndUtils } from '../createTestFileAndUtils';

export const createWithTestComponent = async (destinationPath: string, componentName: string) => {
  await createComponentWithTypesAndStyle(destinationPath, componentName);
  await createTestFileAndUtils(destinationPath, componentName);
};
