import React from "react";
import Box from "@mui/material/Box";
import KBAIcon from "@mui/icons-material/KeyboardArrowUp";

interface HighestPriorityIconProps {
  fontSize?: "small" | "inherit" | "large" | "medium";
  color?: "inherit" | "disabled" | "action" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

const HighestPriorityIcon = (props: HighestPriorityIconProps): JSX.Element => {
  const { fontSize = "small", color = "inherit" } = props;
  return (
    <Box display='flex' flexDirection='column' maxHeight='20px' justifyContent='center'>
      <KBAIcon fontSize={fontSize} color={color} />
      <KBAIcon fontSize={fontSize} sx={{ marginTop: -1.9 }} color={color} />
    </Box>
  );
};

export default HighestPriorityIcon;
