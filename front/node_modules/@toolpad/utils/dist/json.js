// src/json.ts
function getCircularReplacer() {
  const ancestors = [];
  return function replacer(key, value) {
    if (typeof value !== "object" || value === null) {
      return value;
    }
    while (ancestors.length > 0 && ancestors.at(-1) !== this) {
      ancestors.pop();
    }
    if (ancestors.includes(value)) {
      return "[Circular]";
    }
    ancestors.push(value);
    return value;
  };
}
function replaceRecursiveImpl(obj, replacer) {
  if (Array.isArray(obj)) {
    return obj.map((item, i) => {
      const newItem = replacer.call(obj, i, item);
      return replaceRecursiveImpl(newItem, replacer);
    });
  }
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const newValue = replacer.call(obj, key, value);
        return [key, replaceRecursiveImpl(newValue, replacer)];
      })
    );
  }
  return obj;
}
function replaceRecursive(obj, replacer) {
  return replaceRecursiveImpl({ "": obj }, replacer)[""];
}
export {
  getCircularReplacer,
  replaceRecursive
};
//# sourceMappingURL=json.js.map