// src/path.ts
var IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"];
function getExtension(filePath) {
  const fileName = filePath.split("/").pop() || "";
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex < 0 ? "" : fileName.substring(dotIndex);
}
function hasImageExtension(pathName) {
  const extension = getExtension(pathName);
  return IMAGE_EXTENSIONS.includes(extension);
}
export {
  getExtension,
  hasImageExtension
};
//# sourceMappingURL=path.js.map