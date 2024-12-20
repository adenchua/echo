import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { JSX } from "react";

import SearchIcon from "../icons/SearchIcon";

const SearchBar = (props: TextFieldProps): JSX.Element => {
  const { value, onChange, placeholder = "Search", ...rest } = props;

  return (
    <TextField
      slotProps={{
        input: {
          sx: {
            borderRadius: 100,
            height: "40px",
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="inherit" />
            </InputAdornment>
          ),
        },
      }}
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default SearchBar;
