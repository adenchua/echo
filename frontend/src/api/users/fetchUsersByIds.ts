import axios from "axios";

import User from "../../types/User";
import { UMS_API_ENDPOINT } from "../../utils/constants";

const fetchUsersByIds = async (userIds: string[]): Promise<User[]> => {
  try {
    const response = await axios.post<User[]>(`${UMS_API_ENDPOINT}/users/bulk-retrieve`, { userIds });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchUsersByIds;
