import MuiSlide, { SlideProps } from "@mui/material/Slide";

const Slide = (props: SlideProps) => {
  return <MuiSlide in mountOnEnter unmountOnExit timeout={700} {...props} />;
};

export default Slide;
