import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface RightDrawerTitleProps {
  title: string;
  actionButton: ReactNode;
}

const RightDrawerTitle = (props: RightDrawerTitleProps): JSX.Element => {
  const { actionButton, title } = props;
  return (
    <Box display='flex' alignItems='baseline' width='100%' mb={1.5}>
      <Typography variant='body2'>{title}</Typography>
      {actionButton}
    </Box>
  );
};

export default RightDrawerTitle;
