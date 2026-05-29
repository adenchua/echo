import axios from "axios";

import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const updateProject = async (
  projectId: string,
  title: string,
  description: string,
): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
    await axiosInstance.patch(`${SERVER_API_URL}/api/v1/projects/id/${projectId}`, {
      title,
      description,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error", { cause: error });
    } else {
      throw new Error("Unexpected Error", { cause: error });
    }
  }
};

export default updateProject;
