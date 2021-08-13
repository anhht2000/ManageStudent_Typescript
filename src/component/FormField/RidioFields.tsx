import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioProps,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { useController } from "react-hook-form";
import { Control } from "react-hook-form";

interface RidioFieldsProps {
  name: string;
  control: Control<any>;
  label: string;
  options: Array<{ value: string; label: string }>;
}

export default function RidioFields({
  name,
  control,
  label,
  options,
}: RidioFieldsProps): ReactElement {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Box mt={2}>
      <FormControl component='fieldset' onBlur={onBlur}>
        <FormLabel component='legend'>{label}</FormLabel>
        <RadioGroup aria-label='gender' value={value} onChange={onChange}>
          {options.map((opt) => (
            <FormControlLabel value={opt.value} label={opt.label} control={<Radio />} />
          ))}
        </RadioGroup>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </Box>
  );
}
