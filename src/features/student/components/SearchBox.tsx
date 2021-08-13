import { FormControl, Input, InputAdornment, InputLabel } from "@material-ui/core";
import React, { ReactElement } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Params } from "typeData";

interface SearchBoxProps {
  filter: Params;
  onSearchChange?: (e: any) => void;
}

export default function SearchBox({ filter, onSearchChange }: SearchBoxProps): ReactElement {
  return (
    <FormControl fullWidth size='small'>
      <InputLabel htmlFor='standard-adornment-amount'>Enter To Search</InputLabel>
      <Input
        id='standard-adornment-amount'
        // value={values.amount}
        onChange={(e: any) => onSearchChange?.(e)}
        endAdornment={
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
