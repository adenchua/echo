import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { JSX } from "react";

interface SelectProps extends Omit<MuiSelectProps, "label"> {
  label: string;
}

const Select = (props: SelectProps): JSX.Element => {
  const { label, ...rest } = props;
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        SelectDisplayProps={{
          style: {
            display: "flex",
            flexWrap: "nowrap",
          },
        }}
        label={label}
        fullWidth
        {...rest}
      />
    </FormControl>
  );
};

export default Select;
