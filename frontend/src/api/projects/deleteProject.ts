import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await axios.delete(`${API_ENDPOINT}/projects/id/${projectId}`);
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteProject;
