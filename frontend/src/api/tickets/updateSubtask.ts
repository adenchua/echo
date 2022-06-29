import axios from "axios";
import { SubtaskUpdateFields } from "../../types/Subtask";

import { API_ENDPOINT } from "../../utils/constants";

const updateSubtask = async (subtaskId: string, fieldsToUpdate: SubtaskUpdateFields): Promise<void> => {
  try {
    await axios.patch<void>(`${API_ENDPOINT}/subtasks/id/${subtaskId}`, fieldsToUpdate);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default updateSubtask;
