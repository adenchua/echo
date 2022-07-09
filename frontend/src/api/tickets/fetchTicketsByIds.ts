import axios from "axios";

import Ticket from "../../types/Ticket";
import { API_ENDPOINT } from "../../utils/constants";

const fetchTicketsByIds = async (ticketIds: string[]): Promise<Ticket[]> => {
  try {
    const response = await axios.post<Ticket[]>(`${API_ENDPOINT}/tickets/bulk-retrieve`, { ticketIds });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchTicketsByIds;
