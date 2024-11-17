// src/httpApiAdapters.ts
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
export {
  adaptRequestFromExpressToFetch,
  encodeRequestBody
};
//# sourceMappingURL=httpApiAdapters.js.map