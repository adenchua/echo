import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const removeMemberFromProject = async (projectId: string, userId: string): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await axiosInstance.post(`${SERVER_API_URL}/api/v1/projects/members/remove/${projectId}`, {
      userId,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default removeMemberFromProject;
