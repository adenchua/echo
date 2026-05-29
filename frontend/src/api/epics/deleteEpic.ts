import axios from "axios";

import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const deleteEpic = async (epicId: string): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
    await axiosInstance.delete(`${SERVER_API_URL}/api/v1/epics/id/${epicId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteEpic;
