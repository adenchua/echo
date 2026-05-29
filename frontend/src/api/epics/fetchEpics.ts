import axios from "axios";

import ApiResponseWrapper from "../../types/ApiResponseWrapper";
import Epic from "../../types/Epic";
import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const fetchEpics = async (epicIds: string[]): Promise<Epic[]> => {
  try {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post<ApiResponseWrapper<Epic[]>>(
      `${SERVER_API_URL}/api/v1/epics/bulk-retrieve`,
      {
        epicIds,
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

export default fetchEpics;
