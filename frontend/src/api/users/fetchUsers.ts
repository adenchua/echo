import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import User from "../../types/User";
import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const fetchUsers = async (queryString: string): Promise<User[]> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
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
