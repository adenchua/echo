import axios from "axios";

import User from "../../types/User";
import { UMS_API_ENDPOINT } from "../../utils/constants";

const login = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`${UMS_API_ENDPOINT}/users/user-login`, {
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
