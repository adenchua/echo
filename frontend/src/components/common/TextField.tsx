import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

interface TextFieldProps extends Omit<MuiTextFieldProps, "label"> {
  label: string;
}

const TextField = (props: TextFieldProps) => {
  const { label, sx, ...rest } = props;

  return <MuiTextField fullWidth label={label} {...rest} />;
};

export default TextField;
