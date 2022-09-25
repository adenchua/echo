import Alert from "@mui/material/Alert";

const ErrorBanner = (): JSX.Element => {
  return (
    <Alert severity='error' sx={{ border: "1px solid", borderColor: "error" }}>
      Something went wrong. Please try again later.
    </Alert>
  );
};

export default ErrorBanner;
