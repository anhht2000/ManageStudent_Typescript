import { Box, TextField } from "@material-ui/core";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface InputsFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  control: Control<any>;
}

export const InputsField = ({ name, control, label, ...inputprops }: InputsFieldProps) => {
  const {
    field: { value, onBlur, onChange, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Box mt={2}>
      <TextField
        size='small'
        fullWidth
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        variant='outlined'
        error={invalid}
        inputRef={ref}
        inputProps={inputprops}
        helperText={error?.message}
      />
    </Box>
  );
};
