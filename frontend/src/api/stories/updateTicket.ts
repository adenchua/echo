import axios from "axios";

import StoryInterface, { TicketUpdateFieldsType } from "../../types/StoryInterface";
import { API_ENDPOINT } from "../../utils/constants";

const updateTicket = async (ticketId: string, fieldsToUpdate: TicketUpdateFieldsType): Promise<StoryInterface> => {
  try {
    const response = await axios.patch<StoryInterface>(`${API_ENDPOINT}/stories/id/${ticketId}`, fieldsToUpdate);
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
