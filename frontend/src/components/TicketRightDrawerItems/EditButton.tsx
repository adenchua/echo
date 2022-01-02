import React from "react";
import Typography from "@mui/material/Typography";

interface EditButtonProps {
  onStartEdit: any;
}

const EditButton = (props: EditButtonProps): JSX.Element => {
  const { onStartEdit } = props;

  return (
    <Typography
      variant='body2'
      color='primary'
      sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
      onClick={onStartEdit}
    >
      Edit
    </Typography>
  );
};

export default EditButton;
