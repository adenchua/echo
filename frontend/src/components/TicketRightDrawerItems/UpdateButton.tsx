import Button from "@mui/material/Button";

interface UpdateButtonProps {
  showSaveButton: boolean;
  onAccept: any;
  onCancel: any;
}

const UpdateButton = (props: UpdateButtonProps): JSX.Element => {
  const { onAccept, onCancel, showSaveButton } = props;

  return (
    <>
      <Button variant='text' onClick={onCancel} size='small'>
        Cancel
      </Button>
      {showSaveButton && (
        <Button variant='text' onClick={onAccept} size='small'>
          Save
        </Button>
      )}
    </>
  );
};

export default UpdateButton;
