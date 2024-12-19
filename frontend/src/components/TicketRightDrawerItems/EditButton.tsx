import ButtonText from "../common/ButtonText";

interface EditButtonProps {
  onStartEdit: any;
}

const EditButton = (props: EditButtonProps) => {
  const { onStartEdit } = props;

  return (
    <ButtonText color="primary" onClick={onStartEdit}>
      Edit
    </ButtonText>
  );
};

export default EditButton;
