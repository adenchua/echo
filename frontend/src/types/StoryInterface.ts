export type StatusType = "todo" | "progress" | "review" | "completed" | "stuck" | "hold";
interface StoryInterface {
  _id: string;
  title: string;
  description: string;
  assigneeIds: string[];
  createdDate: string;
  dueDate: string;
  status: StatusType;
  weight: number;
  priority: "low" | "medium" | "high" | "highest";
  type: "story" | "task" | "bug";
  subtaskIds: string[];
}

export default StoryInterface;
