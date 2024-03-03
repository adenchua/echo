import MuiGrow, { GrowProps } from "@mui/material/Grow";

const Grow = (props: GrowProps): JSX.Element => {
  return <MuiGrow in mountOnEnter unmountOnExit timeout={700} {...props} />;
};

export default Grow;
