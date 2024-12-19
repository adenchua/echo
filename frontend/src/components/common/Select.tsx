import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface SelectProps extends Omit<MuiSelectProps, "label"> {
  label: string;
}

const Select = (props: SelectProps) => {
  const { label, ...rest } = props;
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} fullWidth {...rest} />
    </FormControl>
  );
};

export default Select;
