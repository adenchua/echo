import Button from "@mui/material/Button";

interface EditButtonProps {
  onStartEdit: any;
}

const EditButton = (props: EditButtonProps): JSX.Element => {
  const { onStartEdit } = props;

  return (
    <Button variant='text' size='small' color='primary' onClick={onStartEdit}>
      Edit
    </Button>
  );
};

export default EditButton;
