import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const deleteTicketSubtask = async (subtaskId: string): Promise<void> => {
  try {
    await axios.delete(`${API_ENDPOINT}/v1/subtasks/id/${subtaskId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteTicketSubtask;
