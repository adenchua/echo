import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

const Link = (props: MuiLinkProps) => {
  const { sx, ...rest } = props;
  return <MuiLink sx={{ cursor: "pointer", textDecoration: "none", ...sx }} {...rest} />;
};

export default Link;
