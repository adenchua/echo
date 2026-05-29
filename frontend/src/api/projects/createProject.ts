import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import Project from "../../types/Project";
import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const createProject = async (title: string, adminId: string, type: string): Promise<Project> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post<ApiResponseWrapper<Project>>(
      `${SERVER_API_URL}/api/v1/projects`,
      {
        title,
        adminId,
        type,
      },
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error", { cause: error });
    } else {
      throw new Error("Unexpected Error", { cause: error });
    }
  }
};

export default createProject;
