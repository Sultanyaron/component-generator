import fsModule, { mkdir } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const fs = fsModule.promises;
export const generateComponent = async (componentName: string) => {
  // 1. Copy component + component.style
  // 2. Copy story if relevant
  // 3. Copy test if relevant
  const data = await fs.readFile(
    path.resolve(
      path.dirname(decodeURI(fileURLToPath(import.meta.url))),
      "../templates/TemplateComponent.tsx.template"
    ),
    "utf8"
  );
  console.log("HIIII" + process.cwd());
  const template = data.replace(/TemplateComponentName/g, componentName);
  const destinationDir = `${process.cwd()}/${componentName}`;
  await fs.mkdir(destinationDir, { recursive: true });
  await fs.writeFile(
    `${destinationDir}/${componentName}.tsx`,
    template,
    "utf8"
  );
};
