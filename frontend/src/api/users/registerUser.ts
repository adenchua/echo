import axios from "axios";

import User from "../../types/User";
import { SERVER_API_URL } from "../../utils/constants";

const registerUser = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axios.post<{ data: User }>(`${SERVER_API_URL}/api/v1/users`, {
      username,
      password,
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default registerUser;
