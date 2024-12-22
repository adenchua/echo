import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const deleteProject = async (projectId: string): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await axiosInstance.delete(`${SERVER_API_URL}/api/v1/projects/id/${projectId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default deleteProject;
