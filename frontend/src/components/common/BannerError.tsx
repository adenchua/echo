import Alert, { AlertProps } from "@mui/material/Alert";
import { JSX } from "react";

const BannerError = (props: AlertProps): JSX.Element => {
  return <Alert severity="error" {...props} />;
};

export default BannerError;
