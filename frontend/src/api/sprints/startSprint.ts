import axios from "axios";

import Sprint from "../../types/Sprint";
import { SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import getAxiosInstance from "../getAxiosInstance";

const startSprint = async (projectId: string, endDateISOString: string): Promise<Sprint> => {
  try {
    const axiosInstance = getAxiosInstance();
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
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default startSprint;
