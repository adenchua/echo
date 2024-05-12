import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";

const removeTicketFromEpic = async (ticketId: string, epicId: string): Promise<void> => {
  try {
    await axios.post(`${SERVER_API_URL}/v1/epics/remove-ticket/${epicId}`, { ticketId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default removeTicketFromEpic;
