import axios from "axios";
import { SubtaskUpdateFields } from "../../types/Subtask";

import { LOADING_DELAY_MS, SERVER_API_URL } from "../../utils/constants";
import getAxiosInstance from "../getAxiosInstance";
import { sleep } from "../../utils/sleep";

const updateSubtask = async (
  subtaskId: string,
  fieldsToUpdate: SubtaskUpdateFields,
): Promise<void> => {
  try {
    const axiosInstance = getAxiosInstance();
    await sleep(LOADING_DELAY_MS);
    await axiosInstance.patch<void>(
      `${SERVER_API_URL}/api/v1/subtasks/id/${subtaskId}`,
      fieldsToUpdate,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
};

export default updateSubtask;
