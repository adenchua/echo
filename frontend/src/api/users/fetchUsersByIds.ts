import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import User from "../../types/User";
import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const fetchUsersByIds = async (userIds: string[]): Promise<User[]> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post<ApiResponseWrapper<User[]>>(
      `${SERVER_API_URL}/api/v1/users/bulk-fetch`,
      { userIds },
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

export default fetchUsersByIds;
