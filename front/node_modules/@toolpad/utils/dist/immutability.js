// src/immutability.ts
function update(dest, src) {
  let result;
  Object.entries(src).forEach(([key, value]) => {
    if (dest[key] !== value) {
      result = result || { ...dest };
      result[key] = value;
    }
  });
  return result || dest;
}
function updateOrCreate(dest, src) {
  return dest ? update(dest, src) : src;
}
function insert(array, value, index) {
  return [...array.slice(0, index), value, ...array.slice(index)];
}
function updateArray(array, value, index) {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
function remove(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
function omit(obj, ...keys) {
  let result;
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!result) {
        result = { ...obj };
      }
      delete result[key];
    }
  });
  return result || obj;
}
function take(obj, ...keys) {
  const keySet = new Set(keys);
  let result;
  Object.keys(obj).forEach((key) => {
    if (!keySet.has(key)) {
      if (!result) {
        result = { ...obj };
      }
      delete result[key];
    }
  });
  return result || obj;
}
function without(array, value) {
  const result = [];
  let found = false;
  for (let i = 0; i < array.length; i += 1) {
    const elm = array[i];
    if (elm === value) {
      found = true;
    } else {
      result.push(elm);
    }
  }
  return found ? result : array;
}
export {
  insert,
  omit,
  remove,
  take,
  update,
  updateArray,
  updateOrCreate,
  without
};
//# sourceMappingURL=immutability.js.map