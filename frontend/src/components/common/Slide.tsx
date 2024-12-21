import MuiSlide, { SlideProps } from "@mui/material/Slide";
import { JSX } from "react";

const Slide = (props: SlideProps): JSX.Element => {
  return <MuiSlide in mountOnEnter unmountOnExit timeout={700} {...props} />;
};

export default Slide;
