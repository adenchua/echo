import axios from "axios";
import Subtask from "../../types/Subtask";

import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const addTicketSubtask = async (ticketId: string, title: string): Promise<Subtask> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
    const response = await axiosInstance.post<ApiResponseWrapper<Subtask>>(
      `${SERVER_API_URL}/api/v1/subtasks`,
      {
        ticketId,
        title,
      },
    );
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
