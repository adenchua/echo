import axios from "axios";

import UserInterface from "../../types/UserInterface";
import { UMS_API_ENDPOINT } from "../../utils/constants";

const login = async (username: string, password: string): Promise<UserInterface> => {
  try {
    const response = await axios.post<UserInterface>(`${UMS_API_ENDPOINT}/user-login`, {
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
