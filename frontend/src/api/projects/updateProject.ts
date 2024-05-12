import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";

const updateProject = async (
  projectId: string,
  title: string,
  description: string,
): Promise<void> => {
  try {
    await axios.patch(`${SERVER_API_URL}/v1/projects/id/${projectId}`, { title, description });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default updateProject;
