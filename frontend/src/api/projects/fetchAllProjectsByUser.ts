import axios from "axios";

import Project from "../../types/Project";
import { SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";

const fetchAllProjectsByUser = async (userId: string): Promise<Project[]> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get<ApiResponseWrapper<Project[]>>(
      `${SERVER_API_URL}/api/v1/projects/user/${userId}`,
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

export default fetchAllProjectsByUser;
