import {
  createStyles,
  FormControl,
  Theme,
  makeStyles,
  InputLabel,
  Select,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { cities, Params } from "typeData";

interface SelectBoxProps {
  listCity: cities[];
  filter: Params;
  onCityChange?: (e: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
export default function SelectBox({
  filter,
  onCityChange,
  listCity,
}: SelectBoxProps): ReactElement {
  const classes = useStyles();
  return (
    <FormControl variant='outlined' className={classes.formControl} size='small' fullWidth>
      <InputLabel htmlFor='outlined-age-native-simple'>City</InputLabel>
      <Select
        native
        onChange={onCityChange}
        label='City'
        value={filter.city || ""}
        inputProps={{
          name: "age",
          id: "outlined-age-native-simple",
        }}
      >
        <option value='' />
        {listCity.map((city) => (
          <option key={city.code} value={city.code}>
            {city.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
