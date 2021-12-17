import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const updateProject = async (projectId: string, title: string, description: string): Promise<void> => {
  try {
    await axios.patch(`${API_ENDPOINT}/projects/id/${projectId}`, { title, description });
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default updateProject;
