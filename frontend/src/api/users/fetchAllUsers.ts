import axios from "axios";

import UserInterface from "../../types/UserInterface";
import { UMS_API_ENDPOINT } from "../../utils/constants";

const fetchAllUsers = async (): Promise<UserInterface[]> => {
  try {
    const response = await axios.get<UserInterface[]>(`${UMS_API_ENDPOINT}/users/all`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default fetchAllUsers;
