import axios from "axios";

import ProjectInterface from "../../types/ProjectInterface";
import { API_ENDPOINT } from "../../utils/constants";

const createProject = async (title: string, adminId: string, type: string): Promise<ProjectInterface> => {
  try {
    const response = await axios.post<ProjectInterface>(`${API_ENDPOINT}/projects`, { title, adminId, type });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default createProject;