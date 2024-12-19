import axios from "axios";

import User from "../../types/User";
import { SERVER_API_URL } from "../../utils/constants";

const fetchUsersByIds = async (userIds: string[]): Promise<User[]> => {
  try {
    const response = await axios.post<User[]>(`${SERVER_API_URL}/api/users/bulk-fetch`, {
      userIds,
    });
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
