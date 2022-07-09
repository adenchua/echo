import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { format, compareAsc } from "date-fns";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";

import EditButton from "./EditButton";
import UpdateButton from "./UpdateButton";
import useProductBacklog from "../../hooks/useProductBacklog";

interface DueDateEditItemProps {
  ticketId: string;
  dueDate: string;
}

const DueDateEditItem = (props: DueDateEditItemProps): JSX.Element => {
  const { dueDate, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();
  const isDue = dueDate && compareAsc(new Date(), new Date(dueDate)) === 1 ? true : false;

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicketDueDate = (newDate: Date | null): void => {
    const dueDateInputInISOString = newDate ? newDate.toISOString() : null;
    onUpdateTicket(ticketId, { dueDate: dueDateInputInISOString });
    handleToggleEditMode();
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={2} gap={1}>
          <Typography variant='body2'>Due Date</Typography>
          <UpdateButton onAccept={handleUpdateTicketDueDate} onCancel={handleToggleEditMode} showUpdateButton={false} />
        </Box>
        <Box mb={3} width='100%'>
          <DatePicker
            value={isDue ? null : dueDate}
            onChange={(newSelectedDate) => {
              handleUpdateTicketDueDate(newSelectedDate);
            }}
            minDate={new Date()}
            reduceAnimations
            OpenPickerButtonProps={{
              disableRipple: true,
              disableTouchRipple: true,
              size: "small",
              color: "primary",
              edge: "start",
              sx: {
                border: "1px solid",
              },
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} ref={inputRef}>
                <input {...inputProps} style={{ display: "none" }} />
                <div>{InputProps?.endAdornment}</div>
                {!dueDate && (
                  <Typography variant='body2' color='textSecondary'>
                    None
                  </Typography>
                )}
                {dueDate && (
                  <Typography variant='body2' color='textSecondary'>
                    {format(new Date(dueDate), " dd MMMM yyyy")}
                  </Typography>
                )}
              </Box>
            )}
          />
          {dueDate && (
            <Button
              sx={{ mt: 3 }}
              onClick={() => handleUpdateTicketDueDate(null)}
              fullWidth
              variant='outlined'
              size='small'
              color='warning'
            >
              Remove Due Date
            </Button>
          )}
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' gap={1} mb={0.5}>
        <Typography variant='body2'>Due Date</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      <ListItemText
        secondary={!dueDate || dueDate === "" ? "None" : format(new Date(dueDate), "dd MMMM yyyy")}
        secondaryTypographyProps={{
          color: isDue ? "crimson" : "textSecondary",
        }}
        sx={{ mb: 2 }}
      />
      <Divider flexItem />
    </ListItem>
  );
};

export default DueDateEditItem;
