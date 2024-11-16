import { SubmitHandler } from "react-hook-form";

export type FormProps<T> = {
  onSubmit: SubmitHandler<T>;
};
