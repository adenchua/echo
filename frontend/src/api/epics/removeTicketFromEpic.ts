import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const removeTicketFromEpic = async (ticketId: string, epicId: string): Promise<void> => {
  try {
    await axios.post(`${API_ENDPOINT}/epics/remove-ticket/${epicId}`, { ticketId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default removeTicketFromEpic;
