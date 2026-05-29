import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { JSX } from "react";

interface SelectProps extends Omit<MuiSelectProps, "label"> {
  label: string;
}

const Select = (props: SelectProps): JSX.Element => {
  const { label, variant, sx, ...rest } = props;
  const { size } = rest;

  return (
    <FormControl fullWidth variant={variant} sx={sx}>
      <InputLabel size={size} sx={{ fontSize: "14px" }}>
        {label}
      </InputLabel>
      <MuiSelect
        SelectDisplayProps={{
          style: {
            display: "flex",
            flexWrap: "nowrap",
          },
        }}
        label={label}
        fullWidth
        variant={variant}
        {...rest}
      />
    </FormControl>
  );
};

export default Select;
