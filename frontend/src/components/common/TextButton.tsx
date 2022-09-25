import { Typography } from "@mui/material";

interface TextButtonProps {
  handleOnClick: () => void;
  text: string;
}

const TextButton = (props: TextButtonProps): JSX.Element => {
  const { handleOnClick, text } = props;
  return (
    <Typography
      variant='body2'
      color='primary'
      sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
      onClick={handleOnClick}
    >
      {text}
    </Typography>
  );
};

export default TextButton;
