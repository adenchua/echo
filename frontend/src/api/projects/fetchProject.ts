import axios from "axios";

import Project from "../../types/Project";
import { API_ENDPOINT } from "../../utils/constants";

const fetchProject = async (id: string): Promise<Project> => {
  try {
    const response = await axios.get<Project>(`${API_ENDPOINT}/v1/projects/id/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchProject;
