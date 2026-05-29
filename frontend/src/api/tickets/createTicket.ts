import axios from "axios";

import Ticket, { TicketPriority, TicketType } from "../../types/Ticket";
import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const createTicket = async (
  title: string,
  projectId: string,
  priority: TicketPriority,
  type: TicketType,
): Promise<Ticket> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
    const response = await axiosInstance.post<ApiResponseWrapper<Ticket>>(
      `${SERVER_API_URL}/api/v1/tickets`,
      {
        title,
        projectId,
        priority,
        type,
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

export default createTicket;
