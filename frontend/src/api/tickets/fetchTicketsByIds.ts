import axios from "axios";

import Ticket from "../../types/Ticket";
import { SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";

const fetchTicketsByIds = async (ticketIds: string[]): Promise<Ticket[]> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post<ApiResponseWrapper<Ticket[]>>(
      `${SERVER_API_URL}/api/v1/tickets/bulk-retrieve`,
      {
        ticketIds,
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

export default fetchTicketsByIds;
