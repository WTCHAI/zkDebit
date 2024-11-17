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

// src/workerRpc.ts
var workerRpc_exports = {};
__export(workerRpc_exports, {
  createRpcClient: () => createRpcClient,
  serveRpc: () => serveRpc
});
module.exports = __toCommonJS(workerRpc_exports);
var import_worker_threads = require("worker_threads");

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

// src/workerRpc.ts
function createRpcClient(port, { timeout = 3e4 } = {}) {
  return new Proxy({}, {
    get: (target, prop) => {
      if (typeof prop !== "string") {
        return Reflect.get(target, prop);
      }
      return (...args) => {
        return new Promise((resolve, reject) => {
          const { port1, port2 } = new import_worker_threads.MessageChannel();
          const timeoutId = setTimeout(() => {
            port1.close();
          }, timeout);
          port1.on("message", (msg) => {
            clearTimeout(timeoutId);
            if (msg.error) {
              reject(msg.error);
            } else {
              resolve(msg.result);
            }
          });
          port1.start();
          port.postMessage(
            {
              method: prop,
              args,
              port: port2
            },
            [port2]
          );
        });
      };
    }
  });
}
function serveRpc(port, methods) {
  const methodMap = new Map(Object.entries(methods));
  port.on("message", async (msg) => {
    const method = methodMap.get(msg.method);
    if (method) {
      try {
        const result = await method(...msg.args);
        msg.port.postMessage({ result });
      } catch (rawError) {
        msg.port.postMessage({ error: serializeError(errorFrom(rawError)) });
      }
    } else {
      msg.port.postMessage({
        error: new Error(`Method "${msg.method}" not found`)
      });
    }
  });
  port.start();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRpcClient,
  serveRpc
});
//# sourceMappingURL=workerRpc.cjs.map