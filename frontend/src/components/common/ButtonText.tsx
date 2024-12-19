import { CircularProgress } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

interface ButtonTextProps
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

const ButtonText = (props: ButtonTextProps) => {
  const { color = "primary", state = "default", sx, ...rest } = props;

  return (
    <MuiButton
      startIcon={state === "loading" && <CircularProgress color="inherit" size={16} />}
      variant="text"
      disableElevation
      disableFocusRipple
      disableRipple
      disableTouchRipple
      color={(function () {
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
      sx={{ textTransform: "none", borderRadius: 100, ...sx, textWrap: "nowrap" }}
      disabled={state === "disabled" || state === "loading"}
      {...rest}
    />
  );
};

export default ButtonText;
