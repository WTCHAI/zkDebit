import { Button, Grid2 as Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProps } from "./form";

type AddCardFormType = {
  cardNumber: string;
  cvv: string;
};

export default function AddCardForm(props: FormProps<AddCardFormType>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCardFormType>();

  return (
    <>
      <Grid size={12}>
        <TextField
          label="Card Number"
          variant="outlined"
          fullWidth
          size="small"
          {...register("cardNumber", {
            required: { value: true, message: "*Required" },
          })}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber?.message}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label="CVV"
          variant="outlined"
          fullWidth
          size="small"
          {...register("cvv", {
            required: { value: true, message: "*Required" },
          })}
          error={!!errors.cvv}
          helperText={errors.cvv?.message}
        />
      </Grid>
      <Grid size={12} mt={4}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit(props.onSubmit)}
        >
          Generate Proof
        </Button>
      </Grid>
    </>
  );
}
