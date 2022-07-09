export type SubtaskUpdateFields = {
  title?: string;
  isCompleted?: boolean;
};

interface Subtask {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export default Subtask;
