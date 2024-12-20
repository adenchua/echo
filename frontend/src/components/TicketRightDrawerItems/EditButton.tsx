import { JSX } from "react";

import ButtonText from "../common/ButtonText";

interface EditButtonProps {
  onStartEdit: React.MouseEventHandler<HTMLButtonElement>;
}

const EditButton = (props: EditButtonProps): JSX.Element => {
  const { onStartEdit } = props;

  return (
    <ButtonText color="primary" onClick={onStartEdit}>
      Edit
    </ButtonText>
  );
};

export default EditButton;
