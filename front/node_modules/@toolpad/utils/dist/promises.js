// src/promises.ts
async function resolveValues(obj) {
  const entries = Object.entries(obj).map(async ([key, value]) => [key, await value]);
  return Object.fromEntries(await Promise.all(entries));
}
export {
  resolveValues
};
//# sourceMappingURL=promises.js.map