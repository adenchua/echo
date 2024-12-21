import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { compareAsc, format } from "date-fns";
import { JSX, useState } from "react";

import useLoad from "../../hooks/useLoad";
import useProductBacklog from "../../hooks/useProductBacklog";
import Button from "../common/Button";
import SnackbarError from "../common/SnackbarError";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

interface DueDateEditItemProps {
  ticketId: string;
  dueDate: string;
}

const DueDateEditItem = (props: DueDateEditItemProps): JSX.Element => {
  const { dueDate, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { onUpdateTicket } = useProductBacklog();
  const isDue = dueDate && compareAsc(new Date(), new Date(dueDate)) === 1 ? true : false;

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicketDueDate = async (newDate: Date | null): Promise<void> => {
    const dueDateInputInISOString = newDate ? newDate.toISOString() : null;
    try {
      handleSetLoadingState("LOADING");
      await onUpdateTicket(ticketId, { dueDate: dueDateInputInISOString });
      handleToggleEditMode();
      handleSetLoadingState("SUCCESS");
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  if (isEditModeOn) {
    return (
      <>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <RightDrawerTitle
            title="Due date"
            actionButton={
              <UpdateButton
                onAccept={undefined}
                onCancel={handleToggleEditMode}
                showSaveButton={false}
              />
            }
          />
          <Box mb={3} width="100%">
            <DateCalendar
              value={isDue ? null : dueDate}
              onChange={(newSelectedDate) => {
                handleUpdateTicketDueDate(newSelectedDate ? new Date(newSelectedDate) : null);
              }}
              disablePast
              reduceAnimations
            />
            {dueDate && (
              <Button onClick={() => handleUpdateTicketDueDate(null)} fullWidth>
                Remove Due Date
              </Button>
            )}
          </Box>
          <Divider flexItem />
        </ListItem>
        <SnackbarError
          isOpen={currentLoadState === "ERROR"}
          onClose={() => handleSetLoadingState("DEFAULT")}
        />
      </>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <RightDrawerTitle
        title="Due date"
        actionButton={<EditButton onStartEdit={handleToggleEditMode} />}
      />
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
