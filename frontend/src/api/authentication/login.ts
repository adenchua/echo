import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";

const login = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post<{ data: string }>(`${SERVER_API_URL}/api/v1/users/login`, {
      username,
      password,
    });
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
