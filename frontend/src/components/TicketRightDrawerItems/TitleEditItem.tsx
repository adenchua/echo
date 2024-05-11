import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import useLoad from "../../hooks/useLoad";
import useProductBacklog from "../../hooks/useProductBacklog";
import SnackbarError from "../common/SnackbarError";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

interface TitleEditItemProps {
  ticketId: string;
  title: string;
}

const TitleEditItem = (props: TitleEditItemProps): JSX.Element => {
  const { title, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { currentLoadState, handleSetLoadingState } = useLoad();

  const [titleInput, setTitleInput] = useState<string>(title);
  const { onUpdateTicket } = useProductBacklog();

  useEffect(() => {
    setTitleInput(title);
  }, [isEditModeOn, title]);

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicket = async (): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await onUpdateTicket(ticketId, {
        title: titleInput,
      });
      handleSetLoadingState("SUCCESS");
      handleToggleEditMode();
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  if (isEditModeOn) {
    return (
      <>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <RightDrawerTitle
            title="Ticket"
            actionButton={
              <UpdateButton
                onAccept={handleUpdateTicket}
                onCancel={handleToggleEditMode}
                showSaveButton
              />
            }
          />
          <TextField
            value={titleInput}
            variant="filled"
            fullWidth
            onChange={(e) => setTitleInput(e.target.value)}
            margin="dense"
            inputProps={{ style: { padding: 7 } }}
            sx={{ mb: 2 }}
            autoFocus
          />
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
        title="Ticket"
        actionButton={<EditButton onStartEdit={handleToggleEditMode} />}
      />
      <ListItemText secondary={title} sx={{ mb: 2 }} />
      <Divider flexItem />
    </ListItem>
  );
};

export default TitleEditItem;
