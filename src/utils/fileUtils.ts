import fsModule from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fs = fsModule.promises;

const getTemplatePath = (templatePath: string) => {
  return path.resolve(
    path.dirname(decodeURI(fileURLToPath(import.meta.url))),
    `../templates/${templatePath}`
  );
};

export const saveTemplateToDestination = async (
  destinationDirPath: string,
  fileName: string,
  template: string
) => {
  await fs.mkdir(destinationDirPath, { recursive: true });
  await fs.writeFile(`${destinationDirPath}/${fileName}`, template, "utf8");
};

export const readTemplate = async (templatePath: string) => {
  return await fs.readFile(getTemplatePath(templatePath), "utf8");
};

export const createHooksAndComponentsFolders = async (
  destinationPath: string
) => {
  await fs.mkdir(`${destinationPath}/hooks`, { recursive: true });
  await fs.mkdir(`${destinationPath}/components`, { recursive: true });
};
