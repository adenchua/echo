import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";
import { JSX } from "react";

const Tooltip = (props: TooltipProps): JSX.Element => {
  return <MuiTooltip {...props} disableInteractive />;
};

export default Tooltip;
