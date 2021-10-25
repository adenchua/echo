import axios from "axios";

import UserInterface from "../../types/UserInterface";
import { API_ENDPOINT } from "../../utils/constants";

const fetchUsersByIds = async (userIds: string[]): Promise<UserInterface[]> => {
  try {
    const response = await axios.post<UserInterface[]>(`${API_ENDPOINT}/users/bulk-retrieve`, { userIds });
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
