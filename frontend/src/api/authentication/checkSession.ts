import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import SessionUser from "../../types/SessionUser";
import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const checkSession = async (): Promise<SessionUser> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get<ApiResponseWrapper<SessionUser>>(
      `${SERVER_API_URL}/api/auth/me`,
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.status.toString(), { cause: error });
    } else {
      throw new Error("Unexpected Error", { cause: error });
    }
  }
};

export default checkSession;
