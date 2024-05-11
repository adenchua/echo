import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const addMembersToProject = async (projectId: string, userIds: string[]): Promise<void> => {
  try {
    await axios.post(`${API_ENDPOINT}/v1/projects/members/bulk-add/${projectId}`, { userIds });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default addMembersToProject;
