import axios from "axios";

import Epic from "../../types/Epic";
import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const createEpic = async (title: string, projectId: string): Promise<Epic> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
    const response = await axiosInstance.post<ApiResponseWrapper<Epic>>(
      `${SERVER_API_URL}/api/v1/epics`,
      {
        title,
        projectId,
      },
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default createEpic;
