import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";

const deleteTicket = async (ticketId: string, projectId: string): Promise<void> => {
  try {
    await axios.post(`${SERVER_API_URL}/api/v1/tickets/id/${ticketId}`, { projectId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteTicket;
