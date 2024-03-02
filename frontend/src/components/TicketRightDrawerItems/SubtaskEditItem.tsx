import { Box, Divider, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import fetchSubtasksByIds from "../../api/tickets/fetchSubtasksByIds";
import updateSubtask from "../../api/tickets/updateSubtask";
import useProductBacklog from "../../hooks/useProductBacklog";
import Subtask from "../../types/Subtask";
import TicketSubtask from "../TicketSubtask";
import TicketSubtaskDeletable from "../TicketSubtaskDeletable";
import TextButton from "../common/TextButton";
import EditButton from "./EditButton";

interface SubtaskEditItemProps {
  subtaskIds: string[];
  ticketId: string;
}

const SubtaskEditItem = (props: SubtaskEditItemProps): JSX.Element => {
  const { subtaskIds, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [titleInput, setTitleInput] = useState<string>("");
  const { onAddSubtaskToTicket, onDeleteSubtaskFromTicket } = useProductBacklog();

  useEffect(() => {
    setTitleInput(""); // reset title input upon form activation
  }, [isEditModeOn]);

  useEffect(() => {
    let isMounted = true;

    const getSubtasks = async () => {
      try {
        const response = await fetchSubtasksByIds(subtaskIds);
        if (isMounted) {
          setSubtasks(response);
        }
      } catch {
        // do nothing
      }
    };

    getSubtasks();

    return () => {
      isMounted = false;
    };
  }, [subtaskIds]);

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleAddSubtask = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!titleInput) {
      return; // cannot accept empty titles
    }
    onAddSubtaskToTicket(ticketId, titleInput);
    setTitleInput(""); // reset title input upon creation
  };

  const handleToggleSubtaskCompletion = async (subtaskId: string): Promise<void> => {
    const targetSubtask = subtasks.find((subtask) => subtask._id === subtaskId);
    if (!targetSubtask) {
      return;
    }

    try {
      await updateSubtask(subtaskId, { isCompleted: !targetSubtask.isCompleted });
      setSubtasks((prevState) =>
        prevState.map((subtask) => {
          if (subtask._id === subtaskId) {
            return { ...subtask, isCompleted: !subtask.isCompleted };
          }
          return subtask;
        })
      );
    } catch {
      // do nothing
    }
  };

  const handleDeleteSubtask = async (subtaskId: string): Promise<void> => {
    const targetSubtask = subtasks.find((subtask) => subtask._id === subtaskId);
    if (!targetSubtask) {
      return;
    }

    try {
      onDeleteSubtaskFromTicket(ticketId, subtaskId);
    } catch {
      // do nothing
    }
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' gap={1} width='100%' mb={1}>
          <Typography variant='body2'>Subtasks</Typography>
          <TextButton handleOnClick={handleToggleEditMode} text='Done' />
        </Box>
        <form onSubmit={(e) => handleAddSubtask(e)} style={{ width: "100%" }}>
          <TextField
            size='small'
            variant='filled'
            autoFocus
            fullWidth
            inputProps={{ style: { padding: 7, fontSize: 14 } }}
            placeholder='Type and press enter to add subtask'
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <input type='submit' hidden />
        </form>
        {subtasks.length > 0 && (
          <Box maxWidth='100%' mt={2}>
            {subtasks.map((subtask) => (
              <Box mb={1} key={subtask._id}>
                <TicketSubtaskDeletable subtask={subtask} onDeleteSubtask={handleDeleteSubtask} />
              </Box>
            ))}
          </Box>
        )}
        <Divider flexItem sx={{ mt: 2 }} />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' gap={1} width='100%'>
        <Typography variant='body2'>Subtasks</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      {subtaskIds.length === 0 && <ListItemText secondary='None' sx={{ mt: 0.5 }} />}
      {subtasks.length > 0 && (
        <Box maxWidth='100%' sx={{ mt: 1 }}>
          {subtasks.map((subtask) => (
            <Box mb={1} key={subtask._id}>
              <TicketSubtask subtask={subtask} onToggleCompletion={handleToggleSubtaskCompletion} />
            </Box>
          ))}
        </Box>
      )}
      <Divider flexItem sx={{ mt: 1.5 }} />
    </ListItem>
  );
};

export default SubtaskEditItem;
