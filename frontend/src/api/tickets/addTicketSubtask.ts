import axios from "axios";
import Subtask from "../../types/Subtask";

import { API_ENDPOINT } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";

const addTicketSubtask = async (ticketId: string, title: string): Promise<Subtask> => {
  try {
    const response = await axios.post<ApiResponseWrapper<Subtask>>(`${API_ENDPOINT}/v1/subtasks`, {
      ticketId,
      title,
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default addTicketSubtask;
