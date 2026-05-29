import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import Project from "../../types/Project";
import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const fetchProject = async (id: string): Promise<Project> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get<ApiResponseWrapper<Project>>(
      `${SERVER_API_URL}/api/v1/projects/id/${id}`,
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

export default fetchProject;
