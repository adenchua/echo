import React from "react";
import Typography from "@mui/material/Typography";

interface UpdateButtonProps {
  showUpdateButton: boolean;
  onAccept: any;
  onCancel: any;
}

const UpdateButton = (props: UpdateButtonProps): JSX.Element => {
  const { onAccept, onCancel, showUpdateButton } = props;

  return (
    <>
      {showUpdateButton && (
        <Typography
          variant='body2'
          color='primary'
          sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
          onClick={onAccept}
        >
          Update
        </Typography>
      )}
      <Typography
        variant='body2'
        color='primary'
        sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
        onClick={onCancel}
      >
        Cancel
      </Typography>
    </>
  );
};

export default UpdateButton;
