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

// src/http.ts
var http_exports = {};
__export(http_exports, {
  listen: () => listen
});
module.exports = __toCommonJS(http_exports);
var http = __toESM(require("http"), 1);
var import_invariant = __toESM(require("invariant"), 1);
async function listen(handler, port) {
  const server = typeof handler === "function" ? http.createServer(handler) : handler;
  let app;
  await new Promise((resolve, reject) => {
    app = server.listen(port);
    app.once("listening", resolve);
    app.once("error", reject);
  });
  const address = app?.address();
  (0, import_invariant.default)(address && typeof address === "object", "expected address to be an AddressInfo object");
  return {
    port: address.port,
    async close() {
      await new Promise((resolve, reject) => {
        if (app) {
          app.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listen
});
//# sourceMappingURL=http.cjs.map