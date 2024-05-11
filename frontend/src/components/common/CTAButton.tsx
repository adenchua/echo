import { Button } from "@mui/material";
import { ReactNode } from "react";

interface CTAButtonProps {
  text: string;
  onClick: () => any;
  icon?: ReactNode;
}

const CTAButton = (props: CTAButtonProps): JSX.Element => {
  const { text, onClick, icon } = props;
  return (
    <Button startIcon={icon} onClick={onClick} variant="contained">
      {text}
    </Button>
  );
};

export default CTAButton;
