import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const deleteEpic = async (epicId: string): Promise<void> => {
  try {
    await axios.delete(`${API_ENDPOINT}/epics/id/${epicId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteEpic;
