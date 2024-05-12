import axios from "axios";
import { SubtaskUpdateFields } from "../../types/Subtask";

import { SERVER_API_URL } from "../../utils/constants";

const updateSubtask = async (
  subtaskId: string,
  fieldsToUpdate: SubtaskUpdateFields,
): Promise<void> => {
  try {
    await axios.patch<void>(`${SERVER_API_URL}/v1/subtasks/id/${subtaskId}`, fieldsToUpdate);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default updateSubtask;
