import React from "react";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ProgressBarWithPercentageProps {
  value: number;
}

const ProgressBarWithPercentage = (props: ProgressBarWithPercentageProps): JSX.Element => {
  const { value } = props;

  function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant='determinate' sx={{ height: 10, borderRadius: 6 }} {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant='body2' color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return <LinearProgressWithLabel value={value} />;
};

export default ProgressBarWithPercentage;
