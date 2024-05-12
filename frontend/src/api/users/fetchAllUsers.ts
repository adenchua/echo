import axios from "axios";

import User from "../../types/User";
import { UMS_API_URL } from "../../utils/constants";

const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${UMS_API_URL}/api/users/all`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchAllUsers;
