import axios from "axios";

import Ticket, { PriorityType, TicketType } from "../../types/Ticket";
import { API_ENDPOINT } from "../../utils/constants";

const createTicket = async (
  title: string,
  projectId: string,
  priority: PriorityType,
  type: TicketType
): Promise<Ticket> => {
  try {
    const response = await axios.post<Ticket>(`${API_ENDPOINT}/tickets`, { title, projectId, priority, type });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default createTicket;
