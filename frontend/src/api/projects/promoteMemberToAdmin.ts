import axios from "axios";

import { API_ENDPOINT } from "../../utils/constants";

const promoteMemberToAdmin = async (projectId: string, userId: string): Promise<void> => {
  try {
    await axios.post(`${API_ENDPOINT}/projects/admins/promote/${projectId}`, { userId });
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default promoteMemberToAdmin;
