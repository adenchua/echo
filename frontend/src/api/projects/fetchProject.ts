import axios from "axios";

import Project from "../../types/Project";
import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const fetchProject = async (id: string): Promise<Project> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
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
