import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const addTicketToEpic = async (ticketId: string, epicId: string): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await axiosInstance.post(`${SERVER_API_URL}/api/v1/epics/add-ticket/${epicId}`, { ticketId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default addTicketToEpic;
