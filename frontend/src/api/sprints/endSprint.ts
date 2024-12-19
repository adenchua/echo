import axios from "axios";
import Sprint from "../../types/Sprint";

import { SERVER_API_URL } from "../../utils/constants";
import ApiResponseWrapper from "../../types/ApiResponseWrapper";

const endSprint = async (projectId: string, sprintId: string): Promise<Sprint> => {
  try {
    const response = await axios.post<ApiResponseWrapper<Sprint>>(
      `${SERVER_API_URL}/api/v1/sprints/end`,
      {
        projectId,
        sprintId,
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

export default endSprint;
