import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";

const Tooltip = (props: TooltipProps) => {
  return <MuiTooltip {...props} disableInteractive />;
};

export default Tooltip;
