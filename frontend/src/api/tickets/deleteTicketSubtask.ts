import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";

const deleteTicketSubtask = async (subtaskId: string): Promise<void> => {
  try {
    await axios.delete(`${SERVER_API_URL}/v1/subtasks/id/${subtaskId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteTicketSubtask;
