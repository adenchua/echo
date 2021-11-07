import axios from "axios";

import StoryInterface, { PriorityType, StoryType } from "../../types/StoryInterface";
import { API_ENDPOINT } from "../../utils/constants";

const createStory = async (
  title: string,
  projectId: string,
  priority: PriorityType,
  type: StoryType
): Promise<StoryInterface> => {
  try {
    const response = await axios.post<StoryInterface>(`${API_ENDPOINT}/stories`, { title, projectId, priority, type });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default createStory;
