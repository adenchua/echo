import axios from "axios";

import Ticket, { TicketUpdateFields } from "../../types/Ticket";
import { API_ENDPOINT } from "../../utils/constants";

const updateTicket = async (ticketId: string, fieldsToUpdate: TicketUpdateFields): Promise<Ticket> => {
  try {
    const response = await axios.patch<Ticket>(`${API_ENDPOINT}/tickets/id/${ticketId}`, fieldsToUpdate);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default updateTicket;
