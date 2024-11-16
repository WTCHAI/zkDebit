import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectMui, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

type SelectProps = {
  label: string;
  options: { value: number | string; label: string }[];
  error?: boolean;
  helperText?: string;
  defaultValue?: string;
};

export default function Select(props: SelectProps) {
  const [value, setValue] = React.useState<string>(props.defaultValue || "");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <SelectMui
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={props.label}
          onChange={handleChange}
          error={props.error}
          size="small"
          variant="outlined"
        >
          {props.options.map((opt) => (
            <MenuItem key={opt.value.toString()} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </SelectMui>
        <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}
