import { JSX } from "react";

import ButtonText from "../common/ButtonText";

interface UpdateButtonProps {
  showSaveButton: boolean;
  onAccept: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
}

const UpdateButton = (props: UpdateButtonProps): JSX.Element => {
  const { onAccept, onCancel, showSaveButton } = props;

  return (
    <>
      <ButtonText onClick={onCancel}>Cancel</ButtonText>
      {showSaveButton && <ButtonText onClick={onAccept}>Save</ButtonText>}
    </>
  );
};

export default UpdateButton;
