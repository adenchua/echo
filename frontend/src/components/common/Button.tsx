import { CircularProgress } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { JSX } from "react";

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
  color?: "primary" | "secondary" | "danger";
  state?: "default" | "loading" | "disabled";
}

const Button = (props: ButtonProps): JSX.Element => {
  const { color = "primary", state = "default", sx, ...rest } = props;

  return (
    <MuiButton
      startIcon={state === "loading" && <CircularProgress color="inherit" size={16} />}
      variant="contained"
      disableElevation
      disableFocusRipple
      disableRipple
      disableTouchRipple
      color={(function (): "primary" | "inherit" | "error" {
        switch (color) {
          case "primary":
            return "primary";
          case "secondary":
            return "inherit";
          case "danger":
            return "error";
          default:
            return "primary";
        }
      })()}
      size="large"
      sx={{ height: "40px", textTransform: "none", borderRadius: 100, ...sx, textWrap: "nowrap" }}
      disabled={state === "disabled" || state === "loading"}
      {...rest}
    />
  );
};

export default Button;
