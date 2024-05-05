import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const deleteTicket = async (ticketId: string, projectId: string): Promise<void> => {
  try {
    await axios.post(`${API_ENDPOINT}/v1/tickets/id/${ticketId}`, { projectId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteTicket;
