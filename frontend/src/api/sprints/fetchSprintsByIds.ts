import axios from "axios";

import Sprint from "../../types/Sprint";
import { API_ENDPOINT } from "../../utils/constants";

const fetchSprintsByIds = async (sprintIds: string[]): Promise<Sprint[]> => {
  try {
    const response = await axios.post<Sprint[]>(`${API_ENDPOINT}/v1/sprints/bulk-retrieve`, { sprintIds });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchSprintsByIds;
