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

interface SelectSortProps {
  filter: Params;
  onSortChange?: (e: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
export default function SelectSort({ filter, onSortChange }: SelectSortProps): ReactElement {
  const classes = useStyles();
  return (
    <FormControl variant='outlined' className={classes.formControl} size='small' fullWidth>
      <InputLabel htmlFor='outlined-age-native-simple'>Sort</InputLabel>
      <Select
        native
        onChange={onSortChange}
        label='Sort'
        value={`${filter._sort}.${filter._order}` || ""}
        inputProps={{
          name: "age",
          id: "outlined-age-native-simple",
        }}
      >
        <option value='' />
        <option value='name.asc'>Name ASC</option>
        <option value='name.desc'>Name DESC</option>
        <option value='mark.asc'>Mark ASC</option>
        <option value='mark.desc'>Mark DESC</option>
      </Select>
    </FormControl>
  );
}
