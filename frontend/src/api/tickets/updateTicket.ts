import axios from "axios";

import TicketInterface, { TicketUpdateFieldsType } from "../../types/TicketInterface";
import { API_ENDPOINT } from "../../utils/constants";

const updateTicket = async (ticketId: string, fieldsToUpdate: TicketUpdateFieldsType): Promise<TicketInterface> => {
  try {
    const response = await axios.patch<TicketInterface>(`${API_ENDPOINT}/tickets/id/${ticketId}`, fieldsToUpdate);
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
