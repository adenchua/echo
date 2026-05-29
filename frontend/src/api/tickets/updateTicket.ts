import axios from "axios";

import Ticket, { TicketUpdateFields } from "../../types/Ticket";
import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const updateTicket = async (
  ticketId: string,
  fieldsToUpdate: TicketUpdateFields,
): Promise<Ticket> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
    const response = await axiosInstance.patch<ApiResponseWrapper<Ticket>>(
      `${SERVER_API_URL}/api/v1/tickets/id/${ticketId}`,
      fieldsToUpdate,
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

export default updateTicket;
