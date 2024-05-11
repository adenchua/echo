import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const addTicketToEpic = async (ticketId: string, epicId: string): Promise<void> => {
  try {
    await axios.post(`${API_ENDPOINT}/v1/epics/add-ticket/${epicId}`, { ticketId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default addTicketToEpic;
