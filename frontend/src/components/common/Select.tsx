import { SelectProps, Select as MuiSelect } from "@mui/material";

const Select = (props: SelectProps): JSX.Element => {
  return (
    <MuiSelect
      {...props}
      fullWidth
      SelectDisplayProps={{
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          background: "#00000014",
        },
      }}
      MenuProps={{
        style: {
          maxHeight: 300,
          maxWidth: 300,
        },
      }}
    />
  );
};

export default Select;
