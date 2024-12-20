import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import { JSX } from "react";

const SecondaryText = (props: TypographyProps): JSX.Element => {
  return <MuiTypography color="GrayText" {...props} />;
};

export default SecondaryText;
