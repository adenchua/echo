import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import User from "../../types/User";
import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const fetchUsers = async (queryString: string): Promise<User[]> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get<ApiResponseWrapper<User[]>>(
      `${SERVER_API_URL}/api/v1/users`,
      {
        params: {
          q: queryString,
        },
      },
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

export default fetchUsers;
