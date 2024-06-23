import Chip from "@mui/material/Chip";

import { TicketStatus } from "../types/Ticket";

const CHIP_MIN_WIDTH = "92px";

type MuiChipSizeType = "small" | "medium" | undefined;

interface StatusChipButtonProps {
  status: TicketStatus;
  size: MuiChipSizeType;
}

const StatusChipButton = (props: StatusChipButtonProps): JSX.Element => {
  const { status, size } = props;

  switch (status) {
    case "todo":
      return <Chip label="To Do" sx={{ minWidth: CHIP_MIN_WIDTH }} size={size} />;
    case "progress":
      return (
        <Chip
          label="In Progress"
          sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "warning.light" }}
          size={size}
        />
      );
    case "review":
      return (
        <Chip
          label="Review"
          sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "#ba68c8", color: "#FFF" }}
          size={size}
        />
      );
    case "stuck":
      return (
        <Chip
          label="Stuck"
          sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "error.light", color: "#FFF" }}
          size={size}
        />
      );
    case "hold":
      return (
        <Chip
          label="Hold"
          sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "grey.600", color: "#FFF" }}
          size={size}
        />
      );
    case "completed":
      return (
        <Chip
          label="Done"
          sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "success.light", color: "#FFF" }}
          size={size}
        />
      );
    default:
      return <Chip label="Unknown" sx={{ minWidth: CHIP_MIN_WIDTH }} size={size} />;
  }
};

export default StatusChipButton;
