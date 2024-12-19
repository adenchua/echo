import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";

const addMembersToProject = async (projectId: string, userIds: string[]): Promise<void> => {
  try {
    await axios.post(`${SERVER_API_URL}/api/v1/projects/members/bulk-add/${projectId}`, {
      userIds,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default addMembersToProject;
