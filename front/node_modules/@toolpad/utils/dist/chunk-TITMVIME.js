// src/collections.ts
function asArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
function hasOwnProperty(obj, prop) {
  return obj.hasOwnProperty(prop);
}
function mapProperties(obj, mapper) {
  return Object.fromEntries(
    Object.entries(obj).flatMap((entry) => {
      const mapped = mapper(entry);
      return mapped ? [mapped] : [];
    })
  );
}
function mapKeys(obj, mapper) {
  return mapProperties(obj, ([key, value]) => [mapper(key), value]);
}
function mapValues(obj, mapper) {
  return mapProperties(obj, ([key, value]) => [key, mapper(value, key)]);
}
function filterValues(obj, filter) {
  return mapProperties(obj, ([key, value]) => filter(value) ? [key, value] : null);
}
function filterKeys(obj, filter) {
  return mapProperties(obj, ([key, value]) => filter(key) ? [key, value] : null);
}
function equalProperties(obj1, obj2, subset) {
  const keysToCheck = new Set(
    subset ?? [...Object.keys(obj1), ...Object.keys(obj2)]
  );
  return Array.from(keysToCheck).every((key) => Object.is(obj1[key], obj2[key]));
}

export {
  asArray,
  hasOwnProperty,
  mapProperties,
  mapKeys,
  mapValues,
  filterValues,
  filterKeys,
  equalProperties
};
//# sourceMappingURL=chunk-TITMVIME.js.map