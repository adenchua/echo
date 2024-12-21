import { Box, Divider, ListItem, ListItemText, TextField } from "@mui/material";
import { JSX, useEffect, useState } from "react";

import fetchSubtasksByIds from "../../api/tickets/fetchSubtasksByIds";
import updateSubtask from "../../api/tickets/updateSubtask";
import useLoad from "../../hooks/useLoad";
import useProductBacklog from "../../hooks/useProductBacklog";
import Subtask from "../../types/Subtask";
import TicketSubtask from "../TicketSubtask";
import TicketSubtaskDeletable from "../TicketSubtaskDeletable";
import SnackbarError from "../common/SnackbarError";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

interface SubtaskEditItemProps {
  subtaskIds: string[];
  ticketId: string;
}

const SubtaskEditItem = (props: SubtaskEditItemProps): JSX.Element => {
  const { subtaskIds, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const [titleInput, setTitleInput] = useState<string>("");
  const { onAddSubtaskToTicket, onDeleteSubtaskFromTicket } = useProductBacklog();

  useEffect(() => {
    if (isEditModeOn) {
      handleSetLoadingState("DEFAULT");
      setTitleInput(""); // reset title input upon form activation
    }
  }, [isEditModeOn, handleSetLoadingState]);

  useEffect(() => {
    let isMounted = true;

    const getSubtasks = async (): Promise<void> => {
      try {
        handleSetLoadingState("LOADING");
        const response = await fetchSubtasksByIds(subtaskIds);
        if (isMounted) {
          setSubtasks(response);
          handleSetLoadingState("DEFAULT");
        }
      } catch {
        handleSetLoadingState("ERROR");
      }
    };

    getSubtasks();

    return (): void => {
      isMounted = false;
    };
  }, [subtaskIds, handleSetLoadingState]);

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleAddSubtask = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!titleInput) {
      return; // cannot accept empty titles
    }
    try {
      handleSetLoadingState("LOADING");
      await onAddSubtaskToTicket(ticketId, titleInput);
      handleSetLoadingState("DEFAULT");
      setTitleInput(""); // reset title input upon creation
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  const handleToggleSubtaskCompletion = async (subtaskId: string): Promise<void> => {
    const targetSubtask = subtasks.find((subtask) => subtask._id === subtaskId);
    if (!targetSubtask) {
      return;
    }

    try {
      handleSetLoadingState("LOADING");
      await updateSubtask(subtaskId, { isCompleted: !targetSubtask.isCompleted });
      setSubtasks((prevState) =>
        prevState.map((subtask) => {
          if (subtask._id === subtaskId) {
            return { ...subtask, isCompleted: !subtask.isCompleted };
          }
          return subtask;
        }),
      );
      handleSetLoadingState("DEFAULT");
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  const handleDeleteSubtask = async (subtaskId: string): Promise<void> => {
    const targetSubtask = subtasks.find((subtask) => subtask._id === subtaskId);
    if (!targetSubtask) {
      return;
    }

    try {
      handleSetLoadingState("LOADING");
      await onDeleteSubtaskFromTicket(ticketId, subtaskId);
      handleSetLoadingState("DEFAULT");
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  if (isEditModeOn) {
    return (
      <>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <RightDrawerTitle
            title="Subtasks"
            actionButton={
              <UpdateButton
                onAccept={handleToggleEditMode}
                onCancel={handleToggleEditMode}
                showSaveButton={false}
              />
            }
          />
          <form onSubmit={(e) => handleAddSubtask(e)} style={{ width: "100%" }}>
            <TextField
              variant="filled"
              autoFocus
              fullWidth
              inputProps={{ style: { padding: 7 } }}
              placeholder="Type and press enter to add subtask"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <input type="submit" hidden />
          </form>
          {subtasks.length > 0 && (
            <Box maxWidth="100%" mt={2}>
              {subtasks.map((subtask) => (
                <Box mb={1} key={subtask._id}>
                  <TicketSubtaskDeletable subtask={subtask} onDeleteSubtask={handleDeleteSubtask} />
                </Box>
              ))}
            </Box>
          )}
          <Divider flexItem sx={{ mt: 2 }} />
        </ListItem>
        <SnackbarError
          isOpen={currentLoadState === "ERROR"}
          onClose={() => handleSetLoadingState("DEFAULT")}
        />
      </>
    );
  }

  return (
    <>
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <RightDrawerTitle
          title="Subtasks"
          actionButton={<EditButton onStartEdit={handleToggleEditMode} />}
        />
        {subtaskIds.length === 0 && <ListItemText secondary="None" sx={{ mt: 0.5 }} />}
        {subtasks.length > 0 && (
          <Box maxWidth="100%" sx={{ mt: 1 }}>
            {subtasks.map((subtask) => (
              <Box mb={1} key={subtask._id}>
                <TicketSubtask
                  subtask={subtask}
                  onToggleCompletion={handleToggleSubtaskCompletion}
                />
              </Box>
            ))}
          </Box>
        )}
        <Divider flexItem sx={{ mt: 1.5 }} />
      </ListItem>
      <SnackbarError
        isOpen={currentLoadState === "ERROR"}
        onClose={() => handleSetLoadingState("DEFAULT")}
      />
    </>
  );
};

export default SubtaskEditItem;
