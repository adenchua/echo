const errorCodeToMessageMap = {
  PROJECT_NOT_FOUND: "The project with the given project ID does not exist or is deleted",
  SPRINT_NOT_FOUND: "The sprint with the given sprint ID does not exist or is deleted",
  EPIC_NOT_FOUND: "The epic with the given epic ID does not exist or is deleted",
  TICKET_NOT_FOUND: "The ticket with the given ticket ID does not exist or is deleted",
  SUBTASK_NOT_FOUND: "The subtask with the given subtask ID does not exist or is deleted",
  LAST_PROJECT_ADMINISTRATOR: "A project needs to have least one administrator",
  EXISTING_ACTIVE_SPRINT: "There is an on-going sprint for this project",
  NO_ACTIVE_SPRINT: "There is no active sprint at the moment",
};

export default errorCodeToMessageMap;
