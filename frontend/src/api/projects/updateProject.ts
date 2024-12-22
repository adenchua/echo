import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const updateProject = async (
  projectId: string,
  title: string,
  description: string,
): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await axiosInstance.patch(`${SERVER_API_URL}/api/v1/projects/id/${projectId}`, {
      title,
      description,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default updateProject;
