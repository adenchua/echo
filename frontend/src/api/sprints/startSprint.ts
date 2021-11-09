import axios from "axios";

import SprintInterface from "../../types/SprintInterface";
import { API_ENDPOINT } from "../../utils/constants";

const startSprint = async (projectId: string, endDateISOString: string): Promise<SprintInterface> => {
  try {
    const response = await axios.post<SprintInterface>(`${API_ENDPOINT}/sprints/start`, {
      projectId,
      endDateISOString,
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

export default startSprint;