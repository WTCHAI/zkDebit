// src/objectKey.ts
var weakMap = /* @__PURE__ */ new WeakMap();
var nextId = 0;
function getNextId() {
  const id = `object-id::${nextId}`;
  nextId += 1;
  return id;
}
function getObjectKey(object) {
  let id = weakMap.get(object);
  if (!id) {
    id = getNextId();
    weakMap.set(object, id);
  }
  return id;
}
export {
  getObjectKey
};
//# sourceMappingURL=objectKey.js.map