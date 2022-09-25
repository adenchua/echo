import TextButton from "../common/TextButton";

interface UpdateButtonProps {
  showUpdateButton: boolean;
  onAccept: any;
  onCancel: any;
}

const UpdateButton = (props: UpdateButtonProps): JSX.Element => {
  const { onAccept, onCancel, showUpdateButton } = props;

  return (
    <>
      <TextButton handleOnClick={onCancel} text='Cancel' />
      {showUpdateButton && <TextButton handleOnClick={onAccept} text='Save' />}
    </>
  );
};

export default UpdateButton;
