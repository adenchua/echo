import axios from "axios";

import Subtask from "../../types/Subtask";
import { API_ENDPOINT } from "../../utils/constants";

const fetchSubtasksByIds = async (subtaskIds: string[]): Promise<Subtask[]> => {
  try {
    const response = await axios.post<Subtask[]>(`${API_ENDPOINT}/v1/subtasks/bulk-retrieve`, {
      subtaskIds,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchSubtasksByIds;
