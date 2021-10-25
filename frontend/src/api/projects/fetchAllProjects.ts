import axios from "axios";

import ProjectInterface from "../../types/ProjectInterface";
import { API_ENDPOINT } from "../../utils/constants";

const fetchAllProjects = async (): Promise<ProjectInterface[]> => {
  try {
    const response = await axios.get<ProjectInterface[]>(`${API_ENDPOINT}/projects`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchAllProjects;
