import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { JSX } from "react";

interface TextFieldProps extends Omit<MuiTextFieldProps, "label"> {
  label: string;
}

const TextField = (props: TextFieldProps): JSX.Element => {
  const { label, ...rest } = props;

  return <MuiTextField fullWidth label={label} {...rest} />;
};

export default TextField;
