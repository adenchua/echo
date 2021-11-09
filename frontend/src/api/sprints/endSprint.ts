import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const endSprint = async (projectId: string, sprintId: string): Promise<void> => {
  try {
    await axios.post(`${API_ENDPOINT}/sprints/end`, {
      projectId,
      sprintId,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default endSprint;
