// src/cli.ts
import os from "os";
import path from "path";
function bashResolvePath(pathName) {
  return pathName.startsWith("~/") ? path.resolve(os.homedir(), pathName.slice(2)) : path.resolve(process.cwd(), pathName);
}
export {
  bashResolvePath
};
//# sourceMappingURL=cli.js.map