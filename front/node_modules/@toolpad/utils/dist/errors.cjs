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

// src/errors.ts
var errors_exports = {};
__export(errors_exports, {
  errorFrom: () => errorFrom,
  serializeError: () => serializeError
});
module.exports = __toCommonJS(errors_exports);

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
function serializeError(error) {
  const { message, name, stack, code } = error;
  return { message, name, stack, code };
}
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorFrom,
  serializeError
});
//# sourceMappingURL=errors.cjs.map