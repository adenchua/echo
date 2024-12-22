import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const checkSession = async (): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await axiosInstance.get(`${SERVER_API_URL}/api/auth/me`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.status.toString());
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default checkSession;
