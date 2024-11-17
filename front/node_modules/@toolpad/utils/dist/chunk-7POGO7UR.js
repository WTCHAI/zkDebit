// src/strings.ts
import title from "title";
function uncapitalize(str) {
  return str.length > 0 ? str[0].toLowerCase() + str.slice(1) : "";
}
function capitalize(str) {
  return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : "";
}
function pascalCase(...parts) {
  return parts.map((part) => capitalize(part.toLowerCase())).join("");
}
function camelCase(...parts) {
  if (parts.length > 0) {
    const [first, ...rest] = parts;
    return uncapitalize(first) + pascalCase(...rest);
  }
  return "";
}
function kebabToConstant(input) {
  return input.split("-").map((part) => part.toUpperCase()).join("_");
}
function kebabToPascal(input) {
  return input.split("-").map((part) => capitalize(part)).join("");
}
function generateUniqueString(base, existingNames) {
  let i = 1;
  if (!existingNames.has(base)) {
    return base;
  }
  const newBase = base.replace(/\d+$/, "");
  let suggestion = newBase;
  while (existingNames.has(suggestion)) {
    suggestion = newBase + String(i);
    i += 1;
  }
  return suggestion;
}
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function removeDiacritics(input) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function isAbsoluteUrl(maybeUrl) {
  try {
    return !!new URL(maybeUrl);
  } catch {
    return false;
  }
}
function removePrefix(input, prefix) {
  return input.startsWith(prefix) ? input.slice(prefix.length) : input;
}
function removeSuffix(input, suffix) {
  return input.endsWith(suffix) ? input.slice(0, -suffix.length) : input;
}
function ensurePrefix(input, prefix) {
  return input.startsWith(prefix) ? input : prefix + input;
}
function ensureSuffix(input, suffix) {
  return input.endsWith(suffix) ? input : input + suffix;
}
var IMPORT_STATEMENT_REGEX = /^\s*import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'\s]*([^"']+)["'\s].*/gm;
function findImports(src) {
  return Array.from(src.matchAll(IMPORT_STATEMENT_REGEX), (match) => match[2]);
}
function truncate(str, maxLength, dots = "...") {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + dots;
}
function prependLines(text, prefix) {
  return text.split("\n").map((line) => prefix + line).join("\n");
}
function indent(text, length = 2) {
  return prependLines(text, " ".repeat(length));
}
function isValidJsIdentifier(base) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(base);
}
function guessTitle(str) {
  str = str.replace(/[_-]/g, " ");
  str = str.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  str = str.replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  str = str.replace(/([a-zA-Z])(\d+)/g, "$1 $2");
  str = str.replace(/(\d+)([a-zA-Z])/g, "$1 $2");
  return title(str);
}

export {
  uncapitalize,
  capitalize,
  pascalCase,
  camelCase,
  kebabToConstant,
  kebabToPascal,
  generateUniqueString,
  escapeHtml,
  removeDiacritics,
  isAbsoluteUrl,
  removePrefix,
  removeSuffix,
  ensurePrefix,
  ensureSuffix,
  findImports,
  truncate,
  prependLines,
  indent,
  isValidJsIdentifier,
  guessTitle
};
//# sourceMappingURL=chunk-7POGO7UR.js.map