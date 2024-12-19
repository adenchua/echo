import axios from "axios";

import User from "../../types/User";
import { SERVER_API_URL } from "../../utils/constants";

const login = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post<string>(`${SERVER_API_URL}/api/users/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.status.toString());
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default login;
