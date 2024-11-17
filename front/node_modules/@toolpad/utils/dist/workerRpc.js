import {
  errorFrom,
  serializeError
} from "./chunk-PIGC5JM6.js";
import "./chunk-7POGO7UR.js";
import "./chunk-TITMVIME.js";

// src/workerRpc.ts
import { MessageChannel } from "worker_threads";
function createRpcClient(port, { timeout = 3e4 } = {}) {
  return new Proxy({}, {
    get: (target, prop) => {
      if (typeof prop !== "string") {
        return Reflect.get(target, prop);
      }
      return (...args) => {
        return new Promise((resolve, reject) => {
          const { port1, port2 } = new MessageChannel();
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
export {
  createRpcClient,
  serveRpc
};
//# sourceMappingURL=workerRpc.js.map