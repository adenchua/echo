import axios from "axios";

import { SERVER_API_URL } from "../../utils/constants";

const promoteMemberToAdmin = async (projectId: string, userId: string): Promise<void> => {
  try {
    await axios.post(`${SERVER_API_URL}/v1/projects/admins/promote/${projectId}`, { userId });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default promoteMemberToAdmin;
