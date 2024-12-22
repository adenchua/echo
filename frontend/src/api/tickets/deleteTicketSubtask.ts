import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const deleteTicketSubtask = async (subtaskId: string): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await axiosInstance.delete(`${SERVER_API_URL}/api/v1/subtasks/id/${subtaskId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteTicketSubtask;
