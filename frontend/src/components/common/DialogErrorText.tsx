import DialogContentText, { DialogContentTextProps } from "@mui/material/DialogContentText";

interface DialogErrorTextProps extends DialogContentTextProps {
  text: string;
}

const DialogErrorText = (props: DialogErrorTextProps): JSX.Element => {
  const { text } = props;
  return (
    <DialogContentText color='error' {...props}>
      {text}
    </DialogContentText>
  );
};

export default DialogErrorText;
