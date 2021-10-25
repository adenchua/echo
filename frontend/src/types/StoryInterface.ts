interface StoryInterface {
  _id: string;
  title: string;
  description: string;
  assigneeIds: string[];
  createdDate: string;
  dueDate: string;
  status: "todo" | "progress" | "review" | "completed" | "stuck" | "hold";
  weight: number;
  priority: "low" | "medium" | "high" | "highest";
  type: "story" | "task" | "bug";
  subtaskIds: string[];
}

export default StoryInterface;
