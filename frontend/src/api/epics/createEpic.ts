import axios from "axios";

import Epic from "../../types/Epic";
import { API_ENDPOINT } from "../../utils/constants";

const createEpic = async (title: string, projectId: string): Promise<Epic> => {
  try {
    const response = await axios.post<Epic>(`${API_ENDPOINT}/epics`, {
      title,
      projectId,
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

export default createEpic;
