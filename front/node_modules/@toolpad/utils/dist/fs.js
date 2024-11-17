import {
  errorFrom
} from "./chunk-PIGC5JM6.js";
import "./chunk-7POGO7UR.js";
import "./chunk-TITMVIME.js";

// src/fs.ts
import * as fs from "fs/promises";
import * as path from "path";
import * as yaml from "yaml";
import { yamlOverwrite } from "yaml-diff-patch";
import prettier from "prettier";
async function formatYaml(code, filePath) {
  const readConfig = await prettier.resolveConfig(filePath);
  return prettier.format(code, {
    ...readConfig,
    parser: "yaml"
  });
}
async function readJsonFile(filePath, reviver) {
  const content = await fs.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(content, reviver);
}
async function readMaybeFile(filePath) {
  try {
    return await fs.readFile(filePath, { encoding: "utf-8" });
  } catch (rawError) {
    const error = errorFrom(rawError);
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      return null;
    }
    throw error;
  }
}
async function readMaybeDir(dirPath) {
  try {
    return await fs.readdir(dirPath, { withFileTypes: true });
  } catch (rawError) {
    const error = errorFrom(rawError);
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      return [];
    }
    throw error;
  }
}
async function writeFileRecursive(filePath, content, options) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, options);
}
async function updateYamlFile(filePath, content, options) {
  const oldContent = await readMaybeFile(filePath);
  let newContent = oldContent ? yamlOverwrite(oldContent, content) : yaml.stringify(content);
  if (options?.schemaUrl) {
    const yamlDoc = yaml.parseDocument(newContent);
    yamlDoc.commentBefore = ` yaml-language-server: $schema=${options.schemaUrl}`;
    newContent = yamlDoc.toString();
  }
  newContent = await formatYaml(newContent, filePath);
  if (newContent !== oldContent) {
    await writeFileRecursive(filePath, newContent);
  }
}
async function fileExists(filepath) {
  try {
    const stat2 = await fs.stat(filepath);
    return stat2.isFile();
  } catch (err) {
    if (errorFrom(err).code === "ENOENT") {
      return false;
    }
    throw err;
  }
}
async function folderExists(folderpath) {
  try {
    const stat2 = await fs.stat(folderpath);
    return stat2.isDirectory();
  } catch (err) {
    if (errorFrom(err).code === "ENOENT") {
      return false;
    }
    throw err;
  }
}
async function fileReplace(filePath, searchValue, replaceValue) {
  const queriesFileContent = await fs.readFile(filePath, { encoding: "utf-8" });
  const updatedFileContent = queriesFileContent.replace(searchValue, () => replaceValue);
  await fs.writeFile(filePath, updatedFileContent);
}
async function fileReplaceAll(filePath, searchValue, replaceValue) {
  const queriesFileContent = await fs.readFile(filePath, { encoding: "utf-8" });
  const updatedFileContent = queriesFileContent.replaceAll(searchValue, () => replaceValue);
  await fs.writeFile(filePath, updatedFileContent);
}
export {
  fileExists,
  fileReplace,
  fileReplaceAll,
  folderExists,
  readJsonFile,
  readMaybeDir,
  readMaybeFile,
  updateYamlFile,
  writeFileRecursive
};
//# sourceMappingURL=fs.js.map