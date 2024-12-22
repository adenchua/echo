import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const login = async (username: string, password: string): Promise<string> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post<ApiResponseWrapper<string>>(
      `${SERVER_API_URL}/api/auth/login`,
      {
        username,
        password,
      },
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.status.toString());
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default login;
