import axios from "axios";

import Sprint from "../../types/Sprint";
import { API_ENDPOINT } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";

const startSprint = async (projectId: string, endDateISOString: string): Promise<Sprint> => {
  try {
    const response = await axios.post<ApiResponseWrapper<Sprint>>(
      `${API_ENDPOINT}/v1/sprints/start`,
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
