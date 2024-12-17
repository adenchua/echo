import DialogContentText, { DialogContentTextProps } from "@mui/material/DialogContentText";

interface DialogErrorTextProps extends DialogContentTextProps {
  text: string;
}

const DialogErrorText = (props: DialogErrorTextProps) => {
  const { text } = props;
  return (
    <DialogContentText color="error" {...props}>
      {text}
    </DialogContentText>
  );
};

export default DialogErrorText;
