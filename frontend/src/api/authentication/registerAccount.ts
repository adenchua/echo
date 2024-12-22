import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import User from "../../types/User";
import { SERVER_API_URL } from "../../utils/constants";

const registerAccount = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axios.post<ApiResponseWrapper<User>>(
      `${SERVER_API_URL}/api/auth/create-account`,
      {
        username,
        password,
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

export default registerAccount;
