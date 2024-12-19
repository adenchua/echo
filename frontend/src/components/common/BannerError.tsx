import Alert, { AlertProps } from "@mui/material/Alert";

interface BannerErrorProps extends AlertProps {}

const BannerError = (props: BannerErrorProps) => {
  const { ...rest } = props;
  return <Alert severity="error" {...rest} />;
};

export default BannerError;
