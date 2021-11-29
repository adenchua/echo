import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const addMembersToProject = async (projectId: string, userIds: string[]): Promise<void> => {
  try {
    await axios.post(`${API_ENDPOINT}/projects/members/bulk/${projectId}`, { userIds });
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default addMembersToProject;