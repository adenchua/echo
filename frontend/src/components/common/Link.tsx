import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { JSX } from "react";

const Link = (props: MuiLinkProps): JSX.Element => {
  const { sx, ...rest } = props;
  return <MuiLink sx={{ cursor: "pointer", textDecoration: "none", ...sx }} {...rest} />;
};

export default Link;
