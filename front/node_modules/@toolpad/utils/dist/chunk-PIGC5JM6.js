import {
  truncate
} from "./chunk-7POGO7UR.js";
import {
  hasOwnProperty
} from "./chunk-TITMVIME.js";

// src/errors.ts
function serializeError(error) {
  const { message, name, stack, code } = error;
  return { message, name, stack, code };
}
function errorFrom(maybeError) {
  if (maybeError instanceof Error) {
    return maybeError;
  }
  if (typeof maybeError === "object" && maybeError && hasOwnProperty(maybeError, "message") && typeof maybeError.message === "string") {
    return new Error(maybeError.message, { cause: maybeError });
  }
  if (typeof maybeError === "string") {
    return new Error(maybeError, { cause: maybeError });
  }
  const message = truncate(String(JSON.stringify(maybeError)), 500);
  return new Error(message, { cause: maybeError });
}

export {
  serializeError,
  errorFrom
};
//# sourceMappingURL=chunk-PIGC5JM6.js.map