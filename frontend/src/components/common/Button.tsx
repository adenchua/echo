import { CircularProgress } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

interface ButtonProps
  extends Omit<
    MuiButtonProps,
    | "color"
    | "disabled"
    | "variant"
    | "disableElevation"
    | "disableFocusRipple"
    | "disableRipple"
    | "disableTouchRipple"
    | "size"
  > {
  color?: "primary" | "secondary";
  state?: "default" | "loading" | "disabled";
}

const Button = (props: ButtonProps) => {
  const { color = "primary", state = "default", sx, ...rest } = props;

  return (
    <MuiButton
      startIcon={state === "loading" && <CircularProgress color="inherit" size={16} />}
      variant="contained"
      disableElevation
      disableFocusRipple
      disableRipple
      disableTouchRipple
      color={color === "primary" ? "primary" : "inherit"}
      size="large"
      sx={{ height: "48px", textTransform: "none", borderRadius: 100, ...sx }}
      disabled={state === "disabled" || state === "loading"}
      {...rest}
    />
  );
};

export default Button;
