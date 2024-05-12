import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";

const deleteEpic = async (epicId: string): Promise<void> => {
  try {
    await axios.delete(`${SERVER_API_URL}/v1/epics/id/${epicId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteEpic;
