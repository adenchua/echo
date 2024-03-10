import { SelectProps, Select as MuiSelect } from "@mui/material";

const Select = (props: SelectProps): JSX.Element => {
  return (
    <MuiSelect
      fullWidth
      variant='filled'
      SelectDisplayProps={{
        style: {
          padding: 7,
          display: "flex",
          alignItems: "center",
        },
      }}
      MenuProps={{
        slotProps: {
          paper: {
            sx: {
              maxHeight: 240,
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default Select;
