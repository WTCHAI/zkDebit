"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/fs.ts
var fs_exports = {};
__export(fs_exports, {
  fileExists: () => fileExists,
  fileReplace: () => fileReplace,
  fileReplaceAll: () => fileReplaceAll,
  folderExists: () => folderExists,
  readJsonFile: () => readJsonFile,
  readMaybeDir: () => readMaybeDir,
  readMaybeFile: () => readMaybeFile,
  updateYamlFile: () => updateYamlFile,
  writeFileRecursive: () => writeFileRecursive
});
module.exports = __toCommonJS(fs_exports);
var fs = __toESM(require("fs/promises"), 1);
var path = __toESM(require("path"), 1);
var yaml = __toESM(require("yaml"), 1);
var import_yaml_diff_patch = require("yaml-diff-patch");
var import_prettier = __toESM(require("prettier"), 1);

// src/collections.ts
function hasOwnProperty(obj, prop) {
  return obj.hasOwnProperty(prop);
}

// src/strings.ts
var import_title = __toESM(require("title"), 1);
function truncate(str, maxLength, dots = "...") {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + dots;
}

// src/errors.ts
function errorFrom(maybeError) {
  if (maybeError instanceof Error) {
    return maybeError;
  }
  if (typeof maybeError === "object" && maybeError && hasOwnProperty(maybeError, "message") && typeof maybeError.message === "string") {
    return new Error(maybeError.message, { cause: maybeError });
  }
  if (typeof maybeError === "string") {
    return new Error(maybeError, { cause: maybeError });
  }
  const message = truncate(String(JSON.stringify(maybeError)), 500);
  return new Error(message, { cause: maybeError });
}

// src/fs.ts
async function formatYaml(code, filePath) {
  const readConfig = await import_prettier.default.resolveConfig(filePath);
  return import_prettier.default.format(code, {
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
  let newContent = oldContent ? (0, import_yaml_diff_patch.yamlOverwrite)(oldContent, content) : yaml.stringify(content);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileExists,
  fileReplace,
  fileReplaceAll,
  folderExists,
  readJsonFile,
  readMaybeDir,
  readMaybeFile,
  updateYamlFile,
  writeFileRecursive
});
//# sourceMappingURL=fs.cjs.map