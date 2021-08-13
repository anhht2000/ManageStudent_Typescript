import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  Theme,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { Control, useController } from "react-hook-form";

interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  options: Array<{ value: string; label: string }>;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
export default function SelectField({
  name,
  control,
  label,
  options,
}: SelectFieldProps): ReactElement {
  const classes = useStyles();
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel htmlFor={`${name}-select`}>{label}</InputLabel>
      <Select native value={value} onChange={onChange} onBlur={onBlur} id={`${name}-select`}>
        <option aria-label='None' value='' />
        {options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </Select>
    </FormControl>
  );
}
