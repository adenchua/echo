import axios from "axios";

import StoryInterface from "../../types/StoryInterface";
import { API_ENDPOINT } from "../../utils/constants";

const fetchStoriesByIds = async (storyIds: string[]): Promise<StoryInterface[]> => {
  try {
    const response = await axios.post<StoryInterface[]>(`${API_ENDPOINT}/stories/bulk-retrieve`, { storyIds });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchStoriesByIds;
