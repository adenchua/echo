import Alert, { AlertProps } from "@mui/material/Alert";

const BannerError = (props: AlertProps) => {
  return <Alert severity="error" {...props} />;
};

export default BannerError;
