import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import Subtask from "../../types/Subtask";
import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const fetchSubtasksByIds = async (subtaskIds: string[]): Promise<Subtask[]> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post<ApiResponseWrapper<Subtask[]>>(
      `${SERVER_API_URL}/api/v1/subtasks/bulk-retrieve`,
      {
        subtaskIds,
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

export default fetchSubtasksByIds;
