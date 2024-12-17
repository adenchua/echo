import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import SearchIcon from "../icons/SearchIcon";

const SearchBar = (props: TextFieldProps) => {
  const { value, onChange, placeholder = "Search", ...rest } = props;

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ marginBottom: "12px" }} fontSize="small" />
          </InputAdornment>
        ),
      }}
      variant="filled"
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default SearchBar;
