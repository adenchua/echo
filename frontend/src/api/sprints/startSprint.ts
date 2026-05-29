import axios from "axios";

import Sprint from "../../types/Sprint";
import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const startSprint = async (projectId: string, endDateISOString: string): Promise<Sprint> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
    const response = await axiosInstance.post<ApiResponseWrapper<Sprint>>(
      `${SERVER_API_URL}/api/v1/sprints/start`,
      {
        projectId,
        endDateISOString,
      },
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error", { cause: error });
    } else {
      throw new Error("Unexpected Error", { cause: error });
    }
  }
};

export default startSprint;
