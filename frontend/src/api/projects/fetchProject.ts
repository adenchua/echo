import axios from "axios";

import Project from "../../types/Project";
import { SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";

const fetchProject = async (id: string): Promise<Project> => {
  try {
    const response = await axios.get<ApiResponseWrapper<Project>>(
      `${SERVER_API_URL}/api/v1/projects/id/${id}`,
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchProject;
