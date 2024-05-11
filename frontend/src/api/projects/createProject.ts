import axios from "axios";

import Project from "../../types/Project";
import { API_ENDPOINT } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";

const createProject = async (title: string, adminId: string, type: string): Promise<Project> => {
  try {
    const response = await axios.post<ApiResponseWrapper<Project>>(`${API_ENDPOINT}/v1/projects`, {
      title,
      adminId,
      type,
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default createProject;
