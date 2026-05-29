import axios from "axios";
import { SubtaskUpdateFields } from "../../types/Subtask";

import { SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";

const updateSubtask = async (
  subtaskId: string,
  fieldsToUpdate: SubtaskUpdateFields,
): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await axiosInstance.patch<void>(
      `${SERVER_API_URL}/api/v1/subtasks/id/${subtaskId}`,
      fieldsToUpdate,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error", { cause: error });
    } else {
      throw new Error("Unexpected Error", { cause: error });
    }
  }
};

export default updateSubtask;
