import ChevronUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";

import Tooltip from "./common/Tooltip";

interface HighestPriorityIconProps {
  fontSize?: "small" | "inherit" | "large" | "medium";
  color?: "inherit" | "disabled" | "action" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

const HighestPriorityIcon = (props: HighestPriorityIconProps): JSX.Element => {
  const { fontSize = "small", color = "inherit" } = props;
  return (
    <Tooltip title='Urgent'>
      <Box display='flex' flexDirection='column' maxHeight='20px' justifyContent='center'>
        <ChevronUpIcon fontSize={fontSize} color={color} />
        <ChevronUpIcon fontSize={fontSize} sx={{ marginTop: -1.9 }} color={color} />
      </Box>
    </Tooltip>
  );
};

export default HighestPriorityIcon;
