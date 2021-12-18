import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const deleteTicket = async (ticketId: string): Promise<void> => {
  try {
    await axios.delete(`${API_ENDPOINT}/stories/id/${ticketId}`);
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteTicket;
