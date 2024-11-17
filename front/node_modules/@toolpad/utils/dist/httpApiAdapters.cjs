"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/httpApiAdapters.ts
var httpApiAdapters_exports = {};
__export(httpApiAdapters_exports, {
  adaptRequestFromExpressToFetch: () => adaptRequestFromExpressToFetch,
  encodeRequestBody: () => encodeRequestBody
});
module.exports = __toCommonJS(httpApiAdapters_exports);
function encodeRequestBody(req) {
  const contentType = req.headers["content-type"];
  if (typeof req.body === "object" && contentType?.includes("application/x-www-form-urlencoded")) {
    return Object.entries(req.body).reduce(
      (acc, [key, value]) => {
        const encKey = encodeURIComponent(key);
        const encValue = encodeURIComponent(value);
        return `${acc ? `${acc}&` : ""}${encKey}=${encValue}`;
      },
      ""
    );
  }
  if (contentType?.includes("application/json")) {
    return JSON.stringify(req.body);
  }
  return req.body;
}
function adaptRequestFromExpressToFetch(req) {
  const headers = new Headers();
  for (const headerName of Object.keys(req.headers)) {
    const headerValue = req.headers[headerName]?.toString() ?? "";
    if (Array.isArray(headerValue)) {
      for (const value of headerValue) {
        headers.append(headerName, value);
      }
    } else {
      headers.append(headerName, headerValue);
    }
  }
  return new Request(`${req.protocol}://${req.get("host")}${req.originalUrl}`, {
    method: req.method,
    headers,
    body: /GET|HEAD/.test(req.method) ? void 0 : encodeRequestBody(req)
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adaptRequestFromExpressToFetch,
  encodeRequestBody
});
//# sourceMappingURL=httpApiAdapters.cjs.map