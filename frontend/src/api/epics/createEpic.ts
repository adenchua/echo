import axios from "axios";

import EpicInterface from "../../types/EpicInterface";
import { API_ENDPOINT } from "../../utils/constants";

const createEpic = async (title: string, projectId: string): Promise<EpicInterface> => {
  try {
    const response = await axios.post<EpicInterface>(`${API_ENDPOINT}/epics`, {
      title,
      projectId,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default createEpic;
