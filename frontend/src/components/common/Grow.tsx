import MuiGrow, { GrowProps } from "@mui/material/Grow";
import { JSX } from "react";

const Grow = (props: GrowProps): JSX.Element => {
  return <MuiGrow in mountOnEnter unmountOnExit timeout={700} {...props} />;
};

export default Grow;
