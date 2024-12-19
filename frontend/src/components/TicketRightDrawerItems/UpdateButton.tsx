import ButtonText from "../common/ButtonText";

interface UpdateButtonProps {
  showSaveButton: boolean;
  onAccept: any;
  onCancel: any;
}

const UpdateButton = (props: UpdateButtonProps) => {
  const { onAccept, onCancel, showSaveButton } = props;

  return (
    <>
      <ButtonText onClick={onCancel}>Cancel</ButtonText>
      {showSaveButton && <ButtonText onClick={onAccept}>Save</ButtonText>}
    </>
  );
};

export default UpdateButton;
